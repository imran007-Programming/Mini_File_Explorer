import type { PanelHeaderProps } from "@/types/ui";

export function PanelHeader({ eyebrow, title, actions }: PanelHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
        <h2 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
