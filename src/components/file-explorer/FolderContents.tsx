"use client";

import { FileItemCard } from "@/components/file-explorer/FileItemCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { sortFileSystemNodes } from "@/lib/sort-nodes";
import type { FileSystemNode } from "@/types/filesystem";

interface FolderContentsProps {
  items: FileSystemNode[];
  onOpenFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
  onRename: (node: FileSystemNode) => void;
  onDelete: (node: FileSystemNode) => void;
}

export function FolderContents({
  items,
  onOpenFolder,
  onOpenFile,
  onRename,
  onDelete,
}: FolderContentsProps) {
  const sorted = sortFileSystemNodes(items);

  if (sorted.length === 0) {
    return (
      <EmptyState message="This folder is empty. Create a folder or text file to get started." />
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((item) => (
        <FileItemCard
          key={item.id}
          item={item}
          onOpen={() =>
            item.type === "folder" ? onOpenFolder(item.id) : onOpenFile(item.id)
          }
          onRename={() => onRename(item)}
          onDelete={() => onDelete(item)}
        />
      ))}
    </ul>
  );
}
