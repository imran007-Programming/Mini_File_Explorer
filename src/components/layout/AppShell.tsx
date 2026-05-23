"use client";

import { FileExplorer } from "@/components/file-explorer/FileExplorer";
import { AppHeader } from "@/components/layout/AppHeader";

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <AppHeader />
      <FileExplorer />
    </div>
  );
}
