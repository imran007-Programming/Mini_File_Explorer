import { cn } from "@/lib/cn";
import type { TextInputProps } from "@/types/ui";

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoFocus,
}: TextInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={inputId} className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          "rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-violet-500 focus:ring-2",
          "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100",
        )}
      />
    </label>
  );
}
