"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MainPanel } from "@/components/MainPanel";
import { Modal } from "@/components/Modal";
import { NameForm } from "@/components/NameForm";
import { Sidebar } from "@/components/Sidebar";
import { INITIAL_FILE_SYSTEM } from "@/data/initial";
import {
  cloneTree,
  createNode,
  findNode,
  getDefaultName,
  getFolderChildren,
  removeNode,
  renameNode,
  updateFileContent,
} from "@/lib/filesystem";
import { loadFileSystem, saveFileSystem } from "@/lib/storage";
import type { CreateNodeType, FileSystemNode } from "@/types/filesystem";

type DialogMode =
  | { type: "create"; nodeType: CreateNodeType }
  | { type: "rename"; node: FileSystemNode }
  | { type: "delete"; node: FileSystemNode }
  | null;

export function FileExplorer() {
  const [tree, setTree] = useState<FileSystemNode>(INITIAL_FILE_SYSTEM);
  const [hydrated, setHydrated] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState("root");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(["root", "folder-documents", "folder-projects"])
  );
  const [openFileId, setOpenFileId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogMode>(null);

  useEffect(() => {
    setTree(loadFileSystem());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveFileSystem(tree);
  }, [tree, hydrated]);

  const selectedFolder = useMemo(
    () => findNode(tree, selectedFolderId) ?? tree,
    [tree, selectedFolderId]
  );

  const folderChildren = useMemo(
    () => getFolderChildren(tree, selectedFolderId),
    [tree, selectedFolderId]
  );

  const openFile = useMemo(
    () => (openFileId ? findNode(tree, openFileId) : null),
    [tree, openFileId]
  );

  const persist = useCallback((next: FileSystemNode) => {
    setTree(cloneTree(next));
  }, []);

  const handleToggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectFolder = (id: string) => {
    setSelectedFolderId(id);
    setOpenFileId(null);
    setExpandedIds((prev) => new Set(prev).add(id));
  };

  const handleOpenFile = (id: string) => {
    setOpenFileId(id);
  };

  const handleCreate = (nodeType: CreateNodeType) => {
    setDialog({ type: "create", nodeType });
  };

  const handleRename = (node: FileSystemNode) => {
    setDialog({ type: "rename", node });
  };

  const handleDelete = (node: FileSystemNode) => {
    if (node.id === "root") return;
    setDialog({ type: "delete", node });
  };

  const confirmDelete = () => {
    if (!dialog || dialog.type !== "delete") return;
    const { node } = dialog;
    const next = removeNode(tree, node.id);
    persist(next);
    if (openFileId === node.id) setOpenFileId(null);
    if (selectedFolderId === node.id) setSelectedFolderId("root");
    setDialog(null);
  };

  const submitCreate = (name: string) => {
    if (!dialog || dialog.type !== "create") return;
    const siblings = getFolderChildren(tree, selectedFolderId);
    const finalName =
      name || getDefaultName(siblings, dialog.nodeType);
    const result = createNode(tree, selectedFolderId, dialog.nodeType, finalName);
    if (result) {
      persist(result.tree);
      if (dialog.nodeType === "folder") {
        setExpandedIds((prev) => new Set(prev).add(result.newId));
      } else {
        setOpenFileId(result.newId);
      }
    }
    setDialog(null);
  };

  const submitRename = (name: string) => {
    if (!dialog || dialog.type !== "rename") return;
    persist(renameNode(tree, dialog.node.id, name));
    setDialog(null);
  };

  const handleSaveFile = (content: string) => {
    if (!openFileId) return;
    persist(updateFileContent(tree, openFileId, content));
  };

  if (!hydrated) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center text-sm text-slate-500">
        Loading file system…
      </div>
    );
  }

  const createSiblings = getFolderChildren(tree, selectedFolderId);
  const createDefault =
    dialog?.type === "create"
      ? getDefaultName(createSiblings, dialog.nodeType)
      : "";

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 flex-col md:flex-row">
      <Sidebar
        root={tree}
        selectedFolderId={selectedFolderId}
        expandedIds={expandedIds}
        onSelectFolder={handleSelectFolder}
        onToggleExpand={handleToggleExpand}
        onOpenFile={handleOpenFile}
      />
      <MainPanel
        selectedFolder={selectedFolder}
        children={folderChildren}
        openFile={openFile?.type === "text-file" ? openFile : null}
        onOpenFolder={handleSelectFolder}
        onOpenFile={handleOpenFile}
        onCreate={handleCreate}
        onRename={handleRename}
        onDelete={handleDelete}
        onSaveFile={handleSaveFile}
        onCloseEditor={() => setOpenFileId(null)}
      />

      <Modal
        title={
          dialog?.type === "create"
            ? dialog.nodeType === "folder"
              ? "New folder"
              : "New text file"
            : dialog?.type === "delete"
            ? "Delete"
            : "Rename"
        }
        open={dialog !== null}
        onClose={() => setDialog(null)}
      >
        {dialog?.type === "create" && (
          <NameForm
            initialName={createDefault}
            label="Name"
            placeholder={
              dialog.nodeType === "folder" ? "New Folder" : "filename.txt"
            }
            submitLabel="Create"
            onSubmit={submitCreate}
            onCancel={() => setDialog(null)}
          />
        )}
        {dialog?.type === "rename" && (
          <NameForm
            initialName={dialog.node.name}
            label="New name"
            submitLabel="Save"
            onSubmit={submitRename}
            onCancel={() => setDialog(null)}
          />
        )}
        {dialog?.type === "delete" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-slate-600">
              Delete &ldquo;{dialog.node.name}&rdquo;{dialog.node.type === "folder" ? " and all its contents" : ""}?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDialog(null)}
                className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
