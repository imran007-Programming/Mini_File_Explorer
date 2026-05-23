"use client";

import { CreateToolbar } from "@/components/file-explorer/CreateToolbar";
import { FolderContents } from "@/components/file-explorer/FolderContents";
import { TextEditor } from "@/components/file-explorer/TextEditor";
import { Panel } from "@/components/ui/Panel";
import { PanelHeader } from "@/components/ui/PanelHeader";
import type { MainPanelProps } from "@/types/file-explorer";

export function MainPanel({
  selectedFolder,
  items,
  openFile,
  onOpenFolder,
  onOpenFile,
  onCreate,
  onRename,
  onDelete,
  onSaveFile,
  onCloseEditor,
}: MainPanelProps) {
  if (openFile?.type === "text-file") {
    return (
      <Panel>
        <TextEditor
          file={openFile}
          onSave={onSaveFile}
          onClose={onCloseEditor}
        />
      </Panel>
    );
  }

  return (
    <Panel>
      <PanelHeader
        eyebrow="Current folder"
        title={selectedFolder.name}
        actions={<CreateToolbar onCreate={onCreate} />}
      />
      <div className="flex-1 overflow-y-auto p-4">
        <FolderContents
          items={items}
          onOpenFolder={onOpenFolder}
          onOpenFile={onOpenFile}
          onRename={onRename}
          onDelete={onDelete}
        />
      </div>
    </Panel>
  );
}
