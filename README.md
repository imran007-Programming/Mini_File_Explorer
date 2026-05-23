# Mini File Explorer

A simple hierarchical file manager built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Tree sidebar** — expand/collapse folders, navigate nested structure
- **Main panel** — view folder contents, create/rename/delete items
- **Text files** — open, edit, and save content (persisted in localStorage)
- **CRUD** — create folders and `.txt` files, rename, delete (folders remove all children)
- **Dark mode** — toggle in the header; preference saved in localStorage
- **Responsive** — stacked layout on mobile, side-by-side on desktop

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/                    # Next.js pages, layout, global styles
  components/
    ui/                   # Reusable primitives (Button, Modal, Panel, …)
    icons/                # SVG icons
    layout/               # App shell, header, theme toggle
    file-explorer/        # Feature components (sidebar, tree, editor, …)
  hooks/
    useFileExplorer.ts    # File system state & actions
  providers/
    ThemeProvider.tsx     # Light/dark theme context
  constants/
    explorer.ts           # Root id, default expanded folders
  data/
    initial.ts            # Seed file tree
  lib/
    filesystem.ts         # Tree CRUD utilities
    storage.ts            # localStorage persistence
    sort-nodes.ts         # Folder/file sorting
    dialog-utils.ts       # Modal title helpers
    cn.ts                 # Class name helper
    theme.ts              # Theme storage helpers
  types/
    filesystem.ts         # Node types
    file-explorer.ts      # Explorer component props
    ui.ts                 # UI component props
```

## Scripts

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start dev server     |
| `npm run build` | Production build     |
| `npm run start` | Run production build |
| `npm run lint`  | ESLint               |

Data is stored in the browser under the key `mini-file-explorer-data`.
