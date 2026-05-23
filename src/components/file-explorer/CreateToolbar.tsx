import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import type { CreateNodeType } from "@/types/filesystem";

interface CreateToolbarProps {
  onCreate: (type: CreateNodeType) => void;
}

export function CreateToolbar({ onCreate }: CreateToolbarProps) {
  return (
    <>
      <Button variant="secondary" onClick={() => onCreate("folder")}>
        <PlusIcon className="h-4 w-4" />
        Folder
      </Button>
      <Button variant="primary" onClick={() => onCreate("text-file")}>
        <PlusIcon className="h-4 w-4" />
        File
      </Button>
    </>
  );
}
