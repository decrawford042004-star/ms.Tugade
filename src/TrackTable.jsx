import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

const PAGE_SIZE = 4;

const columns = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "genre", header: "Genre" },
  { accessorKey: "artist", header: "Artist" },
  { accessorKey: "bpm", header: "BPM" },
  { accessorKey: "label", header: "Label" },
  { accessorKey: "role", header: "Role" },
];

export default function TrackTable({ tracks, selectedId, onSelect }) {
  const data = useMemo(() => tracks, [tracks]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: PAGE_SIZE },
    },
  });

  return (
    <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-md">
      <h2 className="font-display text-xl">Playlist registry 📋</h2>
      <p className="mb-4 text-sm text-ink/70">
        {PAGE_SIZE} tracks per page. Click a row to mark it active.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-sage/20">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-2 py-2 font-semibold text-sage">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const active = row.original.id === selectedId;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelect(row.original.id)}
                  className={`cursor-pointer border-b border-sage/10 ${
                    active ? "bg-mint" : "hover:bg-cream"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-2 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-xl border border-sage/30 px-4 py-2 text-sm disabled:opacity-40"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <p className="text-sm text-ink/70">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </p>
        <button
          type="button"
          className="rounded-xl border border-sage/30 px-4 py-2 text-sm disabled:opacity-40"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </section>
  );
}
