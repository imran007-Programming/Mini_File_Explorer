import { cn } from "@/lib/cn";
import type { LoadingSpinnerProps } from "@/types/ui";

const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function LoadingSpinner({
  label,
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={cn(
          "animate-spin rounded-full border-zinc-200 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400",
          sizeClasses[size],
        )}
        aria-hidden
      />
      {label && (
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      )}
      <span className="sr-only">{label ?? "Loading"}</span>
    </div>
  );
}
