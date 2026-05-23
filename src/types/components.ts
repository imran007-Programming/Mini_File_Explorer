import type { CreateNodeType, FileSystemNode } from "@/types/filesystem";

export type DialogMode =
  | { type: "create"; nodeType: CreateNodeType }
  | { type: "rename"; node: FileSystemNode }
  | { type: "delete"; node: FileSystemNode }
  | null;

export interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface NameFormProps {
  initialName?: string;
  label: string;
  placeholder?: string;
  submitLabel: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export interface TextEditorProps {
  file: FileSystemNode;
  onSave: (content: string) => void;
  onClose: () => void;
}

export interface SidebarProps {
  root: FileSystemNode;
  selectedFolderId: string;
  expandedIds: Set<string>;
  onSelectFolder: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onOpenFile: (id: string) => void;
}

export interface TreeNodeProps {
  node: FileSystemNode;
  depth: number;
  selectedFolderId: string;
  expandedIds: Set<string>;
  onSelectFolder: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onOpenFile: (id: string) => void;
}

export interface MainPanelProps {
  selectedFolder: FileSystemNode;
  children: FileSystemNode[];
  openFile: FileSystemNode | null;
  onOpenFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
  onCreate: (type: CreateNodeType) => void;
  onRename: (node: FileSystemNode) => void;
  onDelete: (node: FileSystemNode) => void;
  onSaveFile: (content: string) => void;
  onCloseEditor: () => void;
}
