"use client";

import { ChevronIcon, FileIcon, FolderIcon } from "@/components/icons";
import type { FileSystemNode } from "@/types/filesystem";

interface TreeNodeProps {
  node: FileSystemNode;
  depth: number;
  selectedFolderId: string;
  expandedIds: Set<string>;
  onSelectFolder: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onOpenFile: (id: string) => void;
}

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
        className="flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left text-sm text-slate-600 hover:bg-slate-100"
        style={{ paddingLeft: `${depth * 12 + 24}px` }}
      >
        <FileIcon className="w-4 h-4 shrink-0 text-slate-400" />
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
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <button
          type="button"
          onClick={() => onToggleExpand(node.id)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded hover:bg-slate-100"
          aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
        >
          {hasChildren ? (
            <ChevronIcon className="w-3.5 h-3.5 text-slate-500" expanded={isExpanded} />
          ) : (
            <span className="w-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={() => onSelectFolder(node.id)}
          className={`flex min-w-0 flex-1 items-center gap-1.5 rounded-md py-1 pr-2 text-left text-sm ${
            isSelected
              ? "bg-blue-50 font-medium text-blue-700"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <FolderIcon
            className={`w-4 h-4 shrink-0 ${isSelected ? "text-blue-500" : "text-amber-500"}`}
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
