import { cn } from "@/lib/cn";
import type { EmptyStateProps } from "@/types/ui";

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-10 text-center text-sm text-zinc-500",
        "dark:border-zinc-700 dark:bg-zinc-800/30 dark:text-zinc-400",
        className,
      )}
    >
      {message}
    </div>
  );
}
