"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";

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
import { Separator } from "@/components/ui/separator";

import { signInSchema } from "./sign-in-form-schema";

export function SignInForm() {
  const { push } = useRouter();

  useAuthErrorToast("sign-in");

  const { signInWithEmailAndPassword, signInWithGoogle, isLoading } =
    useAuthStore();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignInWithGoogle() {
    await signInWithGoogle().then(() => {
      push("/");
    });
  }

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    await signInWithEmailAndPassword(values).then(() => {
      push("/");
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
            <CardTitle>Acessar conta:</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar sua conta.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe seu email:"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

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

            <NextLink
              href={"/auth/reset-password"}
              className="ml-auto text-xs text-muted-foreground hover:underline"
            >
              Esqueceu sua senha?
            </NextLink>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>

            <div className="w-full flex items-center gap-2">
              <Separator className="shrink" />

              <span className="min-w-fit text-sm text-muted-foreground">
                Outras opções de entrada
              </span>

              <Separator className="shrink" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleSignInWithGoogle}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Google"
              )}
            </Button>

            <div className="w-full flex items-center gap-2">
              <Separator className="shrink" />

              <span className="min-w-fit text-sm text-muted-foreground">
                Não tem uma conta?
              </span>

              <Separator className="shrink" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => push("/auth/sign-up")}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Criar conta"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
