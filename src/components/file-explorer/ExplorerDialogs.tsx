"use client";

import { DeleteConfirm } from "@/components/file-explorer/DeleteConfirm";
import { NameForm } from "@/components/file-explorer/NameForm";
import { Modal } from "@/components/ui/Modal";
import { getDialogTitle } from "@/lib/dialog-utils";
import type { ExplorerDialogsProps } from "@/types/file-explorer";

export function ExplorerDialogs({
  dialog,
  createDefaultName,
  onClose,
  onCreate,
  onRename,
  onConfirmDelete,
}: ExplorerDialogsProps) {
  return (
    <Modal
      title={getDialogTitle(dialog)}
      open={dialog !== null}
      onClose={onClose}
    >
      {dialog?.type === "create" && (
        <NameForm
          initialName={createDefaultName}
          label="Name"
          placeholder={
            dialog.nodeType === "folder" ? "New Folder" : "filename.txt"
          }
          submitLabel="Create"
          onSubmit={onCreate}
          onCancel={onClose}
        />
      )}
      {dialog?.type === "rename" && (
        <NameForm
          initialName={dialog.node.name}
          label="New name"
          submitLabel="Save"
          onSubmit={onRename}
          onCancel={onClose}
        />
      )}
      {dialog?.type === "delete" && (
        <DeleteConfirm
          node={dialog.node}
          onCancel={onClose}
          onConfirm={onConfirmDelete}
        />
      )}
    </Modal>
  );
}
