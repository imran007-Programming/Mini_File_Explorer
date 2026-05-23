"use client";

import { FileIcon, FolderIcon, PlusIcon } from "@/components/icons";
import { TextEditor } from "@/components/TextEditor";
import type { MainPanelProps } from "@/types/components";

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

  if (openFile?.type === "text-file") {
    return (
      <section className="flex min-h-0 flex-1 flex-col bg-white dark:bg-zinc-900">
        <TextEditor
          file={openFile}
          onSave={onSaveFile}
          onClose={onCloseEditor}
        />
      </section>
    );
  }

  const items = [...children];
  items.sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") return -1;
    if (a.type !== "folder" && b.type === "folder") return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-white dark:bg-zinc-900">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Current folder
          </p>
          <h2 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {selectedFolder.name}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCreate("folder")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            <PlusIcon className="h-4 w-4" />
            Folder
          </button>
          <button
            type="button"
            onClick={() => onCreate("text-file")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white shadow-sm shadow-violet-600/25 transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400"
          >
            <PlusIcon className="h-4 w-4" />
            File
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/30 dark:text-zinc-400">
            This folder is empty. Create a folder or text file to get started.
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const isFolder = item.type === "folder";

              return (
                <li
                  key={item.id}
                  className="group rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 transition-all hover:border-violet-300 hover:shadow-md hover:shadow-violet-500/5 dark:border-zinc-700 dark:bg-zinc-800/40 dark:hover:border-violet-500/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (isFolder) onOpenFolder(item.id);
                        else onOpenFile(item.id);
                      }}
                      className="flex min-w-0 flex-1 items-start gap-3 text-left"
                    >
                      {isFolder ? (
                        <FolderIcon className="mt-0.5 h-8 w-8 shrink-0 text-amber-500 dark:text-amber-400" />
                      ) : (
                        <FileIcon className="mt-0.5 h-8 w-8 shrink-0 text-sky-500 dark:text-sky-400" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {isFolder
                            ? `${item.children?.length || 0} items`
                            : "Text file"}
                        </p>
                      </div>
                    </button>

                    <div className="flex shrink-0 flex-col gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => onRename(item)}
                        className="rounded-md px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      >
                        Rename
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="rounded-md px-2 py-0.5 text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
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
