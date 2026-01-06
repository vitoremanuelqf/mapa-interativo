"use client";

import { useMemo, useState } from "react";

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

import clsx from "clsx";
import { Plus } from "lucide-react";

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
import { columns } from "./table-members-columns";
import { useParams } from "next/navigation";
import { AddMemberForm } from "./add-member-form";
import { useGetInstituteMembers } from "@/features/institute/hooks/use-get-institute-members";

export function TableMembers() {
  const isMobile = useIsMobile();

  const params = useParams();

  const instituteId = params.instituteId as string;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const memoizedColumns = useMemo(() => columns(), []);
  const { data: members = [], isLoading } = useGetInstituteMembers({
    instituteId,
  });

  const table = useReactTable({
    data: members,
    columns: memoizedColumns,
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
        role: !isMobile,
      },
    },

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center mb-4 gap-4">
        <Input
          placeholder="Filtrar por email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <AddMemberForm instituteId={instituteId} />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={clsx(
                      "!p-2",
                      header.id === "select" && "w-12 text-center !pl-4",
                      header.id === "actions" && "text-right !pr-4",
                    )}
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
                      className={clsx(
                        "!p-2",
                        cell.column.id === "select" &&
                          "w-12 flex justify-center !pl-4",
                        cell.column.id === "actions" &&
                          "flex justify-end !pr-4",
                      )}
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
                  Nenhum membro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
