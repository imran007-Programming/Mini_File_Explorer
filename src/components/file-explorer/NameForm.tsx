"use client";

import { FormEvent, useEffect, useState } from "react";
import { FormActions } from "@/components/ui/FormActions";
import { TextInput } from "@/components/ui/TextInput";
import type { NameFormProps } from "@/types/file-explorer";

export function NameForm({
  initialName = "",
  label,
  placeholder,
  submitLabel,
  onSubmit,
  onCancel,
}: NameFormProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <TextInput
        label={label}
        value={name}
        onChange={setName}
        placeholder={placeholder}
        autoFocus
      />
      <FormActions
        onCancel={onCancel}
        submitLabel={submitLabel}
        submitDisabled={!name.trim()}
      />
    </form>
  );
}
