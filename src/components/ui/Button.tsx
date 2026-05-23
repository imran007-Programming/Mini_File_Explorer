import { cn } from "@/lib/cn";
import type { ButtonProps, ButtonSize, ButtonVariant } from "@/types/ui";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-600 text-white shadow-sm shadow-violet-600/25 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400",
  secondary:
    "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400",
  ghost:
    "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2 py-0.5 text-xs rounded-md",
  md: "px-3 py-1.5 text-sm rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
