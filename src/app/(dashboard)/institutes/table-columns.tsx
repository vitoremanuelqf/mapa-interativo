import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { DialogDeleteInstitute } from "./dialog-delete-institute";
import { IInstitute } from "@/features/institute/models/institute";

interface IColumns {
  navigate?: (path: string) => void;
}

export function columns({ navigate }: IColumns): ColumnDef<IInstitute>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "campus",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Campus
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="px-3 font-medium">{row.getValue("campus")}</div>
      ),
      enableHiding: false,
    },

    {
      id: "members",
      header: "Membros",
      cell: ({ row }) => {
        const membersCount = row.original.members.length;

        return (
          <div className="px-3">
            <Badge variant="secondary">
              {membersCount} membro{membersCount !== 1 && "s"}
            </Badge>
          </div>
        );
      },
    },

    {
      id: "roles",
      header: "Papéis",
      cell: ({ row }) => {
        const roles = Object.values(row.original.roles);

        const adminCount = roles.filter((role) => role === "admin").length;

        const managerCount = roles.filter((role) => role === "manager").length;

        return (
          <div className="px-3 flex gap-2">
            {adminCount > 0 && (
              <Badge variant="destructive">Admin: {adminCount}</Badge>
            )}
            {managerCount > 0 && <Badge>Manager: {managerCount}</Badge>}
          </div>
        );
      },
      enableHiding: true,
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const instituteId = row.original.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu de ações</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  onClick={() => navigate?.(`/institutes/${instituteId}`)}
                  className="w-full justify-start font-normal !p-2"
                >
                  Acessar
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DialogDeleteInstitute instituteId={instituteId} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];
}
