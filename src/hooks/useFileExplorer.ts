"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_EXPANDED_FOLDER_IDS,
  ROOT_FOLDER_ID,
} from "@/constants/explorer";
import { INITIAL_FILE_SYSTEM } from "@/data/initial_file";
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
import type { DialogMode } from "@/types/file-explorer";
import type { CreateNodeType, FileSystemNode } from "@/types/filesystem";

export function useFileExplorer() {
  const [tree, setTree] = useState<FileSystemNode>(INITIAL_FILE_SYSTEM);
  const [hydrated, setHydrated] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(ROOT_FOLDER_ID);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(DEFAULT_EXPANDED_FOLDER_IDS),
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
    [tree, selectedFolderId],
  );

  const folderItems = useMemo(
    () => getFolderChildren(tree, selectedFolderId),
    [tree, selectedFolderId],
  );

  const openFile = useMemo(
    () => (openFileId ? findNode(tree, openFileId) : null),
    [tree, openFileId],
  );

  const createDefaultName = useMemo(() => {
    if (dialog?.type !== "create") return "";
    const siblings = getFolderChildren(tree, selectedFolderId);
    return getDefaultName(siblings, dialog.nodeType);
  }, [dialog, tree, selectedFolderId]);

  const persist = useCallback((next: FileSystemNode) => {
    setTree(cloneTree(next));
  }, []);

  const closeDialog = useCallback(() => setDialog(null), []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectFolder = useCallback((id: string) => {
    setSelectedFolderId(id);
    setOpenFileId(null);
    setExpandedIds((prev) => new Set(prev).add(id));
  }, []);

  const openFileById = useCallback((id: string) => {
    setOpenFileId(id);
  }, []);

  const closeEditor = useCallback(() => setOpenFileId(null), []);

  const openCreateDialog = useCallback((nodeType: CreateNodeType) => {
    setDialog({ type: "create", nodeType });
  }, []);

  const openRenameDialog = useCallback((node: FileSystemNode) => {
    setDialog({ type: "rename", node });
  }, []);

  const openDeleteDialog = useCallback((node: FileSystemNode) => {
    if (node.id === ROOT_FOLDER_ID) return;
    setDialog({ type: "delete", node });
  }, []);

  const confirmDelete = useCallback(() => {
    if (!dialog || dialog.type !== "delete") return;
    const { node } = dialog;
    persist(removeNode(tree, node.id));
    if (openFileId === node.id) setOpenFileId(null);
    if (selectedFolderId === node.id) setSelectedFolderId(ROOT_FOLDER_ID);
    setDialog(null);
  }, [dialog, tree, openFileId, selectedFolderId, persist]);

  const submitCreate = useCallback(
    (name: string) => {
      if (!dialog || dialog.type !== "create") return;
      const siblings = getFolderChildren(tree, selectedFolderId);
      const finalName = name || getDefaultName(siblings, dialog.nodeType);
      const result = createNode(
        tree,
        selectedFolderId,
        dialog.nodeType,
        finalName,
      );
      if (result) {
        persist(result.tree);
        if (dialog.nodeType === "folder") {
          setExpandedIds((prev) => new Set(prev).add(result.newId));
        } else {
          setOpenFileId(result.newId);
        }
      }
      setDialog(null);
    },
    [dialog, tree, selectedFolderId, persist],
  );

  const submitRename = useCallback(
    (name: string) => {
      if (!dialog || dialog.type !== "rename") return;
      persist(renameNode(tree, dialog.node.id, name));
      setDialog(null);
    },
    [dialog, tree, persist],
  );

  const saveFileContent = useCallback(
    (content: string) => {
      if (!openFileId) return;
      persist(updateFileContent(tree, openFileId, content));
    },
    [openFileId, tree, persist],
  );

  return {
    hydrated,
    tree,
    selectedFolderId,
    expandedIds,
    selectedFolder,
    folderItems,
    openFile,
    dialog,
    createDefaultName,
    navigation: {
      toggleExpand,
      selectFolder,
      openFileById,
      closeEditor,
    },
    actions: {
      openCreateDialog,
      openRenameDialog,
      openDeleteDialog,
      confirmDelete,
      submitCreate,
      submitRename,
      saveFileContent,
      closeDialog,
    },
  };
}
