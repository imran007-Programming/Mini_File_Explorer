import { Button } from "@/components/ui/Button";
import type { FileSystemNode } from "@/types/filesystem";

interface DeleteConfirmProps {
  node: FileSystemNode;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteConfirm({ node, onCancel, onConfirm }: DeleteConfirmProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Delete &ldquo;{node.name}&rdquo;
        {node.type === "folder" ? " and all its contents" : ""}?
      </p>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}
