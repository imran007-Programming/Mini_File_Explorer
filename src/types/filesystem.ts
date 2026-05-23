export type NodeType = "folder" | "text-file";

export interface FileSystemNode {
  id: string;
  name: string;
  type: NodeType;
  children?: FileSystemNode[];
  content?: string;
}

export type CreateNodeType = "folder" | "text-file";
