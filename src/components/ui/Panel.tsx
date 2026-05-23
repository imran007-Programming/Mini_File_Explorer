import { cn } from "@/lib/cn";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className }: PanelProps) {
  return (
    <section
      className={cn(
        "flex min-h-0 flex-1 flex-col bg-white dark:bg-zinc-900",
        className,
      )}
    >
      {children}
    </section>
  );
}
