"use client";

import { Button } from "@/components/ui/Button";
import { NodeIcon } from "@/components/ui/NodeIcon";
import type { FileItemCardProps } from "@/types/file-explorer";

export function FileItemCard({
  item,
  onOpen,
  onRename,
  onDelete,
}: FileItemCardProps) {
  const isFolder = item.type === "folder";

  return (
    <li className="group rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 transition-all hover:border-violet-300 hover:shadow-md hover:shadow-violet-500/5 dark:border-zinc-700 dark:bg-zinc-800/40 dark:hover:border-violet-500/40">
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={onOpen}
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
        >
          <NodeIcon type={item.type} size="lg" className="mt-0.5" />
          <div className="min-w-0">
            <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
              {item.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isFolder
                ? `${item.children?.length ?? 0} items`
                : "Text file"}
            </p>
          </div>
        </button>

        <div className="flex shrink-0 flex-col gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <Button variant="ghost" size="sm" onClick={onRename}>
            Rename
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
