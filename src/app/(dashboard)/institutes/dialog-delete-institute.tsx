"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import useDeleteInstitute from "@/features/institute/hooks/use-delete-institute";

interface DialogDeleteInstituteProps {
  instituteId: string;
}

export function DialogDeleteInstitute({
  instituteId,
}: DialogDeleteInstituteProps) {
  const [open, setOpen] = useState(false);

  const { deleteInstitute, isDeletingInstitute } = useDeleteInstitute();

  function handleDelete() {
    deleteInstitute(
      { instituteId },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex justify-start font-normal text-gray-700 !p-2"
        >
          Deletar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>

          <DialogDescription>
            Esta ação não pode ser desfeita. Tem certeza que deseja deletar este
            instituto?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={isDeletingInstitute}
          >
            Cancelar
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeletingInstitute}
          >
            {isDeletingInstitute ? "Deletando..." : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
