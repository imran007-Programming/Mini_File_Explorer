import type { FileSystemNode } from "@/types/filesystem";

/** Folders first, then alphabetical by name. */
export function sortFileSystemNodes(nodes: FileSystemNode[]): FileSystemNode[] {
  return [...nodes].sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") return -1;
    if (a.type !== "folder" && b.type === "folder") return 1;
    return a.name.localeCompare(b.name);
  });
}
