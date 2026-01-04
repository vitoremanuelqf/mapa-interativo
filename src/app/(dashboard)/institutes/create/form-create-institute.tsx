"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  SchemaCreateInstitute,
  type CreateInstituteInput,
} from "./form-create-institute-schema";

import useCreateInstitute from "@/features/institute/hooks/use-create-institute";
import { useUser } from "@/features/user/hooks/use-user";

export function FormCreateInstitute() {
  const { push } = useRouter();
  const { user } = useUser();

  const { createInstitute, isCreatingInstitute } = useCreateInstitute();

  const form = useForm<CreateInstituteInput>({
    resolver: zodResolver(SchemaCreateInstitute),
    defaultValues: {
      institute: "",
      campus: "",
    },
  });

  function onSubmit(data: CreateInstituteInput) {
    if (!user?.uid) return;

    createInstitute(
      {
        uid: user.uid,
        institute: data.institute,
        campus: data.campus,
      },
      {
        onSuccess: () => {
          push("/institutes");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instituição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Instituto Federal de São Paulo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="campus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campus</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Campus São Paulo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isCreatingInstitute}>
          {isCreatingInstitute ? "Criando..." : "Criar Instituto"}
        </Button>
      </form>
    </Form>
  );
}
