"use client";

import { TreeNode } from "@/components/TreeNode";
import type { FileSystemNode } from "@/types/filesystem";

interface SidebarProps {
  root: FileSystemNode;
  selectedFolderId: string;
  expandedIds: Set<string>;
  onSelectFolder: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onOpenFile: (id: string) => void;
}

export function Sidebar({
  root,
  selectedFolderId,
  expandedIds,
  onSelectFolder,
  onToggleExpand,
  onOpenFile,
}: SidebarProps) {
  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-b border-slate-200 bg-slate-50 md:w-64 md:shrink-0 md:border-b-0 md:border-r">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Folders
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2" aria-label="Folder tree">
        <TreeNode
          node={root}
          depth={0}
          selectedFolderId={selectedFolderId}
          expandedIds={expandedIds}
          onSelectFolder={onSelectFolder}
          onToggleExpand={onToggleExpand}
          onOpenFile={onOpenFile}
        />
      </nav>
    </aside>
  );
}
