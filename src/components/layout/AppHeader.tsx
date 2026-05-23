import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-violet-500/25">
          FE
        </span>
        <div>
          <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Mini File Explorer
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Manage folders and text files
          </p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
