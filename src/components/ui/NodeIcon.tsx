import { FileIcon, FolderIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { NodeType } from "@/types/filesystem";

type NodeIconSize = "sm" | "md" | "lg";

interface NodeIconProps {
  type: NodeType;
  size?: NodeIconSize;
  selected?: boolean;
  className?: string;
}

const sizeClasses: Record<NodeIconSize, string> = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-8 w-8",
};

export function NodeIcon({
  type,
  size = "md",
  selected = false,
  className,
}: NodeIconProps) {
  const iconClass = cn(sizeClasses[size], "shrink-0", className);

  if (type === "folder") {
    return (
      <FolderIcon
        className={cn(
          iconClass,
          selected
            ? "text-violet-600 dark:text-violet-400"
            : "text-amber-500 dark:text-amber-400",
        )}
      />
    );
  }

  return (
    <FileIcon className={cn(iconClass, "text-sky-500 dark:text-sky-400")} />
  );
}
