# Mini File Explorer

A simple hierarchical file manager built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Tree sidebar** — expand/collapse folders, navigate nested structure
- **Main panel** — view folder contents, create/rename/delete items
- **Text files** — open, edit, and save content (persisted in localStorage)
- **CRUD** — create folders and `.txt` files, rename, delete (folders remove all children)
- **Responsive** — stacked layout on mobile, side-by-side on desktop
- **Dark mode** — toggle in the header; preference saved in localStorage

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description          |
| -------------- | -------------------- |
| `npm run dev`  | Start dev server     |
| `npm run build`| Production build     |
| `npm run start`| Run production build |
| `npm run lint` | ESLint               |

## Project structure

```
src/
  app/              # Next.js pages & layout
  components/       # UI (Sidebar, MainPanel, TextEditor, …)
  data/             # Initial mock file tree
  lib/              # Tree utilities & localStorage
  types/            # TypeScript types
```

Data is stored in the browser under the key `mini-file-explorer-data`.
