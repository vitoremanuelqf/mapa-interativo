"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { addMemberSchema, AddMemberFormValues } from "./add-member-form-schema";
import useCreateMember from "@/features/institute/hooks/use-create-member";
import { getUserByEmail } from "@/features/user/services/get-user-by-email";

interface AddMemberFormProps {
  instituteId: string;
  onSuccess?: () => void;
}

export function AddMemberForm({ instituteId, onSuccess }: AddMemberFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { createMemberAsync } = useCreateMember();

  const form = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: "",
      role: "reader",
    },
  });

  async function onSubmit(values: AddMemberFormValues) {
    setIsLoading(true);

    try {
      const email = values.email.toLowerCase().trim();

      const user = await getUserByEmail(email);

      if (!user) {
        form.setError("email", {
          type: "manual",
          message: "Usuário não encontrado.",
        });
        return;
      }

      await createMemberAsync({
        instituteId,
        uid: user.uid,
        role: values.role,
        email,
      });

      form.reset();
      onSuccess?.();
      setOpen(false); // ✅ fecha o dialog
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 ml-auto">
          <Plus className="size-4" />
          Adicionar membro
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar membro</DialogTitle>
          <DialogDescription>
            Convide um usuário para participar do instituto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@instituto.edu.br"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permissão</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a permissão" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="w-full">
                      <SelectItem value="reader">Leitor</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Adicionar"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
