"use client";
import { SidebarSection } from "@/components/ui/SidebarSection";
import type { SidebarProps } from "@/types/file-explorer";
import { FileTreeItem } from "./FileTreeItem";

export function Sidebar({
  root,
  selectedFolderId,
  expandedIds,
  onSelectFolder,
  onToggleExpand,
  onOpenFile,
}: SidebarProps) {
  return (
    <SidebarSection title="Explorer">
      <nav className="flex-1 overflow-y-auto p-2" aria-label="Folder tree">
        <FileTreeItem
          node={root}
          depth={0}
          selectedFolderId={selectedFolderId}
          expandedIds={expandedIds}
          onSelectFolder={onSelectFolder}
          onToggleExpand={onToggleExpand}
          onOpenFile={onOpenFile}
        />
      </nav>
    </SidebarSection>
  );
}
