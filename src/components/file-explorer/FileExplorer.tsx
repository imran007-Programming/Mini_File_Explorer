"use client";

import { ExplorerDialogs } from "@/components/file-explorer/ExplorerDialogs";
import { MainPanel } from "@/components/file-explorer/MainPanel";
import { Sidebar } from "@/components/file-explorer/Sidebar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EXPLORER_CONTENT_HEIGHT } from "@/constants/explorer";
import { useFileExplorer } from "@/hooks/useFileExplorer";
import { cn } from "@/lib/cn";

export function FileExplorer() {
  const {
    hydrated,
    tree,
    selectedFolderId,
    expandedIds,
    selectedFolder,
    folderItems,
    openFile,
    dialog,
    createDefaultName,
    navigation,
    actions,
  } = useFileExplorer();

  if (!hydrated) {
    return (
      <div
        className={cn(
          EXPLORER_CONTENT_HEIGHT,
          "flex items-center justify-center bg-white dark:bg-zinc-900",
        )}
      >
        <LoadingSpinner label="Loading file system…" size="lg" />
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          EXPLORER_CONTENT_HEIGHT,
          "flex min-h-0 flex-col md:flex-row",
        )}
      >
        <Sidebar
          root={tree}
          selectedFolderId={selectedFolderId}
          expandedIds={expandedIds}
          onSelectFolder={navigation.selectFolder}
          onToggleExpand={navigation.toggleExpand}
          onOpenFile={navigation.openFileById}
        />
        <MainPanel
          selectedFolder={selectedFolder}
          items={folderItems}
          openFile={openFile?.type === "text-file" ? openFile : null}
          onOpenFolder={navigation.selectFolder}
          onOpenFile={navigation.openFileById}
          onCreate={actions.openCreateDialog}
          onRename={actions.openRenameDialog}
          onDelete={actions.openDeleteDialog}
          onSaveFile={actions.saveFileContent}
          onCloseEditor={navigation.closeEditor}
        />
      </div>

      <ExplorerDialogs
        dialog={dialog}
        createDefaultName={createDefaultName}
        onClose={actions.closeDialog}
        onCreate={actions.submitCreate}
        onRename={actions.submitRename}
        onConfirmDelete={actions.confirmDelete}
      />
    </>
  );
}
