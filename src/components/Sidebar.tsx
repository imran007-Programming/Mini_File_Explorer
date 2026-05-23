"use client";

import { TreeNode } from "@/components/TreeNode";
import type { SidebarProps } from "@/types/components";

export function Sidebar({
  root,
  selectedFolderId,
  expandedIds,
  onSelectFolder,
  onToggleExpand,
  onOpenFile,
}: SidebarProps) {
  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-b border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/50 md:w-72 md:shrink-0 md:border-b-0 md:border-r">
      <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Explorer
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
