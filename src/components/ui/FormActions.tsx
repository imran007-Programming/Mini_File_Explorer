import { Button } from "@/components/ui/Button";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel: string;
  submitDisabled?: boolean;
  submitVariant?: "primary" | "danger";
}

export function FormActions({
  onCancel,
  submitLabel,
  submitDisabled,
  submitVariant = "primary",
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button type="button" variant="ghost" onClick={onCancel}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant={submitVariant}
        disabled={submitDisabled}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
