// import { FileExplorer } from "@/components/FileExplorer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="flex h-14 shrink-0 items-center border-b border-slate-200 bg-white px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            FE
          </span>
          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              Mini File Explorer
            </h1>
            <p className="text-xs text-slate-500">
              Manage folders and text files
            </p>
          </div>
        </div>
      </header>
      {/* <FileExplorer /> */}
    </div>
  );
}
