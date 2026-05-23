"use client";

import { ChevronIcon, FileIcon, FolderIcon } from "@/components/icons";
import type { TreeNodeProps } from "@/types/components";

export function TreeNode({
  node,
  depth,
  selectedFolderId,
  expandedIds,
  onSelectFolder,
  onToggleExpand,
  onOpenFile,
}: TreeNodeProps) {
  if (node.type === "text-file") {
    return (
      <button
        type="button"
        onClick={() => onOpenFile(node.id)}
        className="flex w-full items-center gap-2 rounded-lg py-1.5 pr-2 text-left text-sm text-zinc-600 transition-colors hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:bg-zinc-800"
        style={{ paddingLeft: `${depth * 14 + 28}px` }}
      >
        <FileIcon className="h-4 w-4 shrink-0 text-sky-500 dark:text-sky-400" />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }

  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedFolderId === node.id;
  const hasChildren = (node.children?.length ?? 0) > 0;

  return (
    <div>
      <div
        className="flex items-center"
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        <button
          type="button"
          onClick={() => onToggleExpand(node.id)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-zinc-200/70 dark:hover:bg-zinc-800"
          aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
        >
          {hasChildren ? (
            <ChevronIcon
              className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400"
              expanded={isExpanded}
            />
          ) : (
            <span className="w-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={() => onSelectFolder(node.id)}
          className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg py-1.5 pr-2 text-left text-sm transition-colors ${
            isSelected
              ? "bg-violet-100 font-medium text-violet-800 dark:bg-violet-500/20 dark:text-violet-200"
              : "text-zinc-700 hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800"
          }`}
        >
          <FolderIcon
            className={`h-4 w-4 shrink-0 ${
              isSelected
                ? "text-violet-600 dark:text-violet-400"
                : "text-amber-500 dark:text-amber-400"
            }`}
          />
          <span className="truncate">{node.name}</span>
        </button>
      </div>
      {isExpanded &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            depth={depth + 1}
            selectedFolderId={selectedFolderId}
            expandedIds={expandedIds}
            onSelectFolder={onSelectFolder}
            onToggleExpand={onToggleExpand}
            onOpenFile={onOpenFile}
          />
        ))}
    </div>
  );
}
