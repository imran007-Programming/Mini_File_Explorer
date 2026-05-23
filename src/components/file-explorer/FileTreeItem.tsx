"use client";

import { ChevronIcon } from "@/components/icons";
import { NodeIcon } from "@/components/ui/NodeIcon";
import { cn } from "@/lib/cn";
import type { TreeNodeProps } from "@/types/file-explorer";

const TREE_INDENT_PX = 24;

export function FileTreeItem({
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
        style={{ paddingLeft: `${depth * TREE_INDENT_PX + 28}px` }}
      >
        <NodeIcon type="text-file" size="sm" />
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
        style={{ paddingLeft: `${depth * TREE_INDENT_PX + 8}px` }}
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
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 rounded-lg py-1.5 pr-2 text-left text-sm transition-colors",
            isSelected
              ? "bg-violet-100 font-medium text-violet-800 dark:bg-violet-500/20 dark:text-violet-200"
              : "text-zinc-700 hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800",
          )}
        >
          <NodeIcon type="folder" size="sm" selected={isSelected} />
          <span className="truncate">{node.name}</span>
        </button>
      </div>
      {isExpanded &&
        node.children?.map((child) => (
          <FileTreeItem
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
