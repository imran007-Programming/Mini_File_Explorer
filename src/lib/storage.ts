import { INITIAL_FILE_SYSTEM } from "@/data/initial_file";
import type { FileSystemNode } from "@/types/filesystem";

const STORAGE_KEY = "mini-file-explorer-data";

export function loadFileSystem(): FileSystemNode {
  if (typeof window === "undefined") {
    return INITIAL_FILE_SYSTEM;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_FILE_SYSTEM;
    return JSON.parse(raw) as FileSystemNode;
  } catch {
    return INITIAL_FILE_SYSTEM;
  }
}

export function saveFileSystem(tree: FileSystemNode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
}
