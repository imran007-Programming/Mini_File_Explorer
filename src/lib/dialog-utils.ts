import type { DialogMode } from "@/types/file-explorer";

export function getDialogTitle(dialog: DialogMode): string {
  if (!dialog) return "";
  if (dialog.type === "create") {
    return dialog.nodeType === "folder" ? "New folder" : "New text file";
  }
  if (dialog.type === "delete") return "Delete";
  return "Rename";
}
