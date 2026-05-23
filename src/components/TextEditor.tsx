"use client";

import { useEffect, useState } from "react";
import type { FileSystemNode } from "@/types/filesystem";

interface TextEditorProps {
  file: FileSystemNode;
  onSave: (content: string) => void;
  onClose: () => void;
}

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
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Text file
          </p>
          <h2 className="truncate text-lg font-semibold text-slate-900">{file.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          {!saved && (
            <span className="text-xs text-amber-600">Unsaved changes</span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saved}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
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
        className="min-h-[280px] flex-1 resize-none border-0 bg-white p-4 font-mono text-sm leading-relaxed text-slate-800 outline-none focus:ring-0 md:min-h-0"
        spellCheck={false}
        aria-label={`Edit ${file.name}`}
      />
    </div>
  );
}
