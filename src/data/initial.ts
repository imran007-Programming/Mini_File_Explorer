import type { FileSystemNode } from "@/types/filesystem";

export const INITIAL_FILE_SYSTEM: FileSystemNode = {
  id: "root",
  name: "My Files",
  type: "folder",
  children: [
    {
      id: "folder-documents",
      name: "Documents",
      type: "folder",
      children: [
        {
          id: "file-notes",
          name: "notes.txt",
          type: "text-file",
          content:
            "Welcome to Mini File Explorer!\n\nEdit this file and your changes will be saved locally.",
        },
        {
          id: "file-todo",
          name: "todo.txt",
          type: "text-file",
          content: "- Build sidebar tree view\n- Implement CRUD operations\n- Add text file editor",
        },
      ],
    },
    {
      id: "folder-projects",
      name: "Projects",
      type: "folder",
      children: [
        {
          id: "folder-web",
          name: "Web",
          type: "folder",
          children: [
            {
              id: "file-readme",
              name: "README.txt",
              type: "text-file",
              content: "Mini File Explorer — a simple hierarchical file manager built with Next.js.",
            },
          ],
        },
      ],
    },
    {
      id: "file-welcome",
      name: "welcome.txt",
      type: "text-file",
      content: "Select a folder in the sidebar or create new files and folders from the main panel.",
    },
  ],
};
