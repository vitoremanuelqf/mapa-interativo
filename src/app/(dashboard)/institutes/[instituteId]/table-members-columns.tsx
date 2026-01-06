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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDeleteMember } from "@/features/institute/hooks/use-delete-institute-member";
import { useUpdateMemberRole } from "@/features/institute/hooks/use-update-member-role";

import { useParams } from "next/navigation";

interface InstituteMemberRow {
  id: string;
  displayName: string;
  email: string;
  role: "admin" | "editor" | "reader";
}

export function columns(): ColumnDef<InstituteMemberRow>[] {
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
      accessorKey: "displayName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="px-3 font-medium">{row.getValue("displayName")}</div>
      ),
    },

    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="px-3 text-muted-foreground">
          {row.getValue("email")}
        </div>
      ),
    },

    {
      accessorKey: "role",
      header: "Permissão",
      cell: ({ row }) => {
        const { id: uid, role } = row.original;

        const params = useParams();
        const instituteId = params.instituteId as string;

        const { updateMemberRole, isUpdatingMemberRole } =
          useUpdateMemberRole();

        return (
          <div className="">
            <Select
              value={role}
              disabled={isUpdatingMemberRole}
              onValueChange={(value) =>
                updateMemberRole({
                  instituteId,
                  uid,
                  role: value as "admin" | "editor" | "reader",
                })
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="reader">Leitor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const uid = row.original.id;

        const params = useParams();
        const instituteId = params.instituteId as string;

        const { deleteMember, isDeletingMember } = useDeleteMember();

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

              <DropdownMenuItem
                className="text-destructive"
                disabled={isDeletingMember}
                onClick={() =>
                  deleteMember({
                    instituteId,
                    uid,
                  })
                }
              >
                Remover membro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];
}
