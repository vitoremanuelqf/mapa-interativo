"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Plus } from "lucide-react";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useIsMobile } from "@/hooks/use-mobile";
import { columns } from "./table-columns";
import useInstitutes from "@/features/institute/hooks/use-get-institutes";
import useDeleteInstitute from "@/features/institute/hooks/use-delete-institute";

export function TableInstitutes() {
  const { push } = useRouter();
  const isMobile = useIsMobile();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const { institutes = [] } = useInstitutes();
  const { deleteInstitute } = useDeleteInstitute();

  const table = useReactTable({
    data: institutes,
    columns: columns({
      navigate: push,
    }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility: {
        roles: !isMobile,
      },
    },

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });

  return (
    <div className="w-full">
      {/* =====================
       * Toolbar
       * ===================== */}
      <div className="flex items-center mb-4 gap-4">
        <Input
          placeholder="Filtrar por campus..."
          value={(table.getColumn("campus")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("campus")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Button onClick={() => push("/institutes/create")} className="ml-auto">
          <Plus />
          Criar Instituto
        </Button>
      </div>

      {/* =====================
       * Table
       * ===================== */}
      <div className="overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`
                      !p-2
                      ${header.id === "select" ? "w-12 text-center !pl-4" : ""}
                      ${header.id === "actions" ? "text-right !pr-4" : ""}
                    `}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`
                        !p-2
                        ${
                          cell.column.id === "select"
                            ? "w-12 flex justify-center !pl-4"
                            : ""
                        }
                        ${
                          cell.column.id === "actions"
                            ? "flex justify-end !pr-4"
                            : ""
                        }
                      `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  Nenhum instituto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* =====================
       * Pagination
       * ===================== */}
      <div className="flex items-center justify-end space-x-2 py-4 gap-4">
        <div className="hidden text-muted-foreground flex-1 text-sm md:flex">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} selecionado(s)
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={clsx(
              "flex-1 md:w-auto",
              !table.getCanPreviousPage() && "hidden",
            )}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={clsx(
              "flex-1 md:w-auto",
              !table.getCanNextPage() && "hidden",
            )}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
