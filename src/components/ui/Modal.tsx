"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { ModalProps } from "@/types/ui";

export function Modal({ title, open, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed top-1/2 left-1/2 m-0 w-[min(100%,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-0 shadow-2xl backdrop:bg-zinc-950/60 open:flex open:flex-col dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClose}
          aria-label="Close"
          className="min-w-8"
        >
          ✕
        </Button>
      </div>
      <div className="p-4">{children}</div>
    </dialog>
  );
}
