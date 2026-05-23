"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PanelHeader } from "@/components/ui/PanelHeader";
import type { TextEditorProps } from "@/types/file-explorer";

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
      <PanelHeader
        eyebrow="Text file"
        title={file.name}
        actions={
          <>
            {!saved && (
              <span className="self-center text-xs font-medium text-amber-600 dark:text-amber-400">
                Unsaved changes
              </span>
            )}
            <Button variant="secondary" onClick={onClose}>
              Back
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={saved}>
              Save
            </Button>
          </>
        }
      />
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
