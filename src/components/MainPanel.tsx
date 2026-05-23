"use client";

import { FileIcon, FolderIcon, PlusIcon } from "@/components/icons";
import { TextEditor } from "@/components/TextEditor";
import type { CreateNodeType, FileSystemNode } from "@/types/filesystem";

interface MainPanelProps {
  selectedFolder: FileSystemNode;
  children: FileSystemNode[];
  openFile: FileSystemNode | null;
  onOpenFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
  onCreate: (type: CreateNodeType) => void;
  onRename: (node: FileSystemNode) => void;
  onDelete: (node: FileSystemNode) => void;
  onSaveFile: (content: string) => void;
  onCloseEditor: () => void;
}

export function MainPanel(props: MainPanelProps) {
  const {
    selectedFolder,
    children,
    openFile,
    onOpenFolder,
    onOpenFile,
    onCreate,
    onRename,
    onDelete,
    onSaveFile,
    onCloseEditor,
  } = props;

  // show editor when a text file is opened
  if (openFile?.type === "text-file") {
    return (
      <section className="flex flex-1 flex-col min-h-0 bg-white">
        <TextEditor
          file={openFile}
          onSave={onSaveFile}
          onClose={onCloseEditor}
        />
      </section>
    );
  }

  // folders first, then files
  const items = [...children];

  items.sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") {
      return -1;
    }

    if (a.type !== "folder" && b.type === "folder") {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });

  return (
    <section className="flex flex-1 flex-col min-h-0 bg-white">
      <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div>
          <p className="text-xs text-slate-500">Current folder</p>

          <h2 className="truncate text-lg font-semibold text-slate-900">
            {selectedFolder.name}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onCreate("folder")}
            className="flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100"
          >
            <PlusIcon className="w-4 h-4" />
            Folder
          </button>

          <button
            type="button"
            onClick={() => onCreate("text-file")}
            className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4" />
            File
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            No files or folders found.
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const isFolder = item.type === "folder";

              return (
                <li
                  key={item.id}
                  className="rounded-lg border border-slate-200 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (isFolder) {
                          onOpenFolder(item.id);
                        } else {
                          onOpenFile(item.id);
                        }
                      }}
                      className="flex flex-1 items-start gap-3 text-left"
                    >
                      {isFolder ? (
                        <FolderIcon className="mt-1 h-7 w-7 shrink-0 text-yellow-500" />
                      ) : (
                        <FileIcon className="mt-1 h-7 w-7 shrink-0 text-blue-500" />
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {item.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {isFolder
                            ? `${item.children?.length || 0} items`
                            : "Text file"}
                        </p>
                      </div>
                    </button>

                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => onRename(item)}
                        className="text-xs text-slate-600 hover:underline"
                      >
                        Rename
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
