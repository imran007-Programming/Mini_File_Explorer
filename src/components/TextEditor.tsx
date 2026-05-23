"use client";

import { useEffect, useState } from "react";
import type { TextEditorProps } from "@/types/components";

export function TextEditor({ file, onSave, onClose }: TextEditorProps) {
  const [content, setContent] = useState(file.content ?? "");
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setContent(file.content ?? "");
    setSaved(true);
  }, [file.id, file.content]);

  const handleSave = () => {
    onSave(content);
    setSaved(true);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Text file
          </p>
          <h2 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {file.name}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {!saved && (
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              Unsaved changes
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saved}
            className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-400"
          >
            Save
          </button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setSaved(false);
        }}
        className="min-h-[280px] flex-1 resize-none border-0 bg-white p-4 font-mono text-sm leading-relaxed text-zinc-800 outline-none focus:ring-0 dark:bg-zinc-900 dark:text-zinc-200 md:min-h-0"
        spellCheck={false}
        aria-label={`Edit ${file.name}`}
      />
    </div>
  );
}
