import type { CreateNodeType, FileSystemNode } from "@/types/filesystem";

export type DialogMode =
  | { type: "create"; nodeType: CreateNodeType }
  | { type: "rename"; node: FileSystemNode }
  | { type: "delete"; node: FileSystemNode }
  | null;

export interface TreeNavigationProps {
  selectedFolderId: string;
  expandedIds: Set<string>;
  onSelectFolder: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onOpenFile: (id: string) => void;
}

export interface SidebarProps extends TreeNavigationProps {
  root: FileSystemNode;
}

export interface TreeNodeProps extends TreeNavigationProps {
  node: FileSystemNode;
  depth: number;
}

export interface MainPanelProps {
  selectedFolder: FileSystemNode;
  items: FileSystemNode[];
  openFile: FileSystemNode | null;
  onOpenFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
  onCreate: (type: CreateNodeType) => void;
  onRename: (node: FileSystemNode) => void;
  onDelete: (node: FileSystemNode) => void;
  onSaveFile: (content: string) => void;
  onCloseEditor: () => void;
}

export interface FileItemCardProps {
  item: FileSystemNode;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export interface TextEditorProps {
  file: FileSystemNode;
  onSave: (content: string) => void;
  onClose: () => void;
}

export interface NameFormProps {
  initialName?: string;
  label: string;
  placeholder?: string;
  submitLabel: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export interface ExplorerDialogsProps {
  dialog: DialogMode;
  createDefaultName: string;
  onClose: () => void;
  onCreate: (name: string) => void;
  onRename: (name: string) => void;
  onConfirmDelete: () => void;
}
