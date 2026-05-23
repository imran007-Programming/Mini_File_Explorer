import type { CreateNodeType, FileSystemNode } from "@/types/filesystem";

export function findNode(
  root: FileSystemNode,
  id: string
): FileSystemNode | null {
  if (root.id === id) return root;
  if (root.type !== "folder" || !root.children) return null;

  for (const child of root.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

export function findParent(
  root: FileSystemNode,
  id: string,
  parent: FileSystemNode | null = null
): FileSystemNode | null {
  if (root.id === id) return parent;
  if (root.type !== "folder" || !root.children) return null;

  for (const child of root.children) {
    const found = findParent(child, id, root);
    if (found) return found;
  }
  return null;
}

export function getFolderChildren(
  root: FileSystemNode,
  folderId: string
): FileSystemNode[] {
  const folder = findNode(root, folderId);
  if (!folder || folder.type !== "folder") return [];
  return folder.children ?? [];
}

function cloneNode(node: FileSystemNode): FileSystemNode {
  if (node.type === "folder") {
    return {
      ...node,
      children: node.children?.map(cloneNode),
    };
  }
  return { ...node };
}

export function cloneTree(root: FileSystemNode): FileSystemNode {
  return cloneNode(root);
}

function updateNode(
  root: FileSystemNode,
  id: string,
  updater: (node: FileSystemNode) => FileSystemNode
): FileSystemNode {
  if (root.id === id) return updater(root);

  if (root.type !== "folder" || !root.children) return root;

  return {
    ...root,
    children: root.children.map((child) => updateNode(child, id, updater)),
  };
}

export function createId(): string {
  return `node-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createNode(
  root: FileSystemNode,
  parentId: string,
  nodeType: CreateNodeType,
  name: string
): { tree: FileSystemNode; newId: string } | null {
  const parent = findNode(root, parentId);
  if (!parent || parent.type !== "folder") return null;

  const id = createId();
  const newNode: FileSystemNode =
    nodeType === "folder"
      ? { id, name, type: "folder", children: [] }
      : { id, name, type: "text-file", content: "" };

  const tree = updateNode(root, parentId, (folder) => ({
    ...folder,
    children: [...(folder.children ?? []), newNode],
  }));

  return { tree, newId: id };
}

export function renameNode(
  root: FileSystemNode,
  id: string,
  name: string
): FileSystemNode {
  return updateNode(root, id, (node) => ({ ...node, name }));
}

function deleteFromParent(
  root: FileSystemNode,
  parentId: string,
  childId: string
): FileSystemNode {
  return updateNode(root, parentId, (folder) => ({
    ...folder,
    children: (folder.children ?? []).filter((c) => c.id !== childId),
  }));
}

export function removeNode(
  root: FileSystemNode,
  id: string
): FileSystemNode {
  if (id === root.id) return root;

  const parent = findParent(root, id);
  if (!parent) return root;

  return deleteFromParent(root, parent.id, id);
}

export function updateFileContent(
  root: FileSystemNode,
  id: string,
  content: string
): FileSystemNode {
  return updateNode(root, id, (node) =>
    node.type === "text-file" ? { ...node, content } : node
  );
}

export function getDefaultName(
  siblings: FileSystemNode[],
  type: CreateNodeType
): string {
  const base = type === "folder" ? "New Folder" : "untitled.txt";
  const names = new Set(siblings.map((s) => s.name));
  if (!names.has(base)) return base;

  let i = 2;
  const stem = type === "folder" ? "New Folder" : "untitled";
  const ext = type === "text-file" ? ".txt" : "";

  while (names.has(`${stem} (${i})${ext}`)) i++;
  return `${stem} (${i})${ext}`;
}

export function collectFolderIds(root: FileSystemNode): string[] {
  const ids: string[] = [];
  if (root.type === "folder") {
    ids.push(root.id);
    root.children?.forEach((child) => {
      ids.push(...collectFolderIds(child));
    });
  }
  return ids;
}
