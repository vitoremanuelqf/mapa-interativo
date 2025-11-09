"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthErrorToast } from "@/features/auth/hooks/use-auth-error-toast";
import { useAuthStore } from "@/features/auth/stores/use-auth-store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

import { confirmNewPasswordSchema } from "./confirm-new-password-form-schema";

export function ConfirmNewPasswordForm() {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const oobCode = searchParams.get("oobCode");

  useAuthErrorToast("confirm-new-password");

  const { confirmNewPassword, isLoading } = useAuthStore();

  const form = useForm<z.infer<typeof confirmNewPasswordSchema>>({
    resolver: zodResolver(confirmNewPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof confirmNewPasswordSchema>) {
    await confirmNewPassword({
      oobCode: oobCode || "",
      password: values.password,
    }).then(() => {
      push("/auth/sign-in");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
        <Card className="gap-4">
          <CardHeader className="gap-0.5">
            <img
              src="/logo.svg"
              alt="Logo"
              width={449}
              height={143}
              className="w-full max-w-60 m-auto mb-4"
            />
            <CardTitle>Nova Senha:</CardTitle>
            <CardDescription>
              Crie uma nova senha para sua conta.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe sua senha:"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme sua senha:"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <p className="text-xs text-muted-foreground">
              Após o envio, você será redirecionado para o login.
            </p>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Salvar"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
