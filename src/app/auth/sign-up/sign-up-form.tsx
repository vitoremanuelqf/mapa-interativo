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

import { signUpSchema } from "./sign-up-form-schema";

export function SignUpForm() {
  const { push } = useRouter();

  useAuthErrorToast("sign-up");

  const { signUpWithEmailAndPassword, signInWithGoogle, isLoading, error } =
    useAuthStore();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function handleSignInWithGoogle() {
    await signInWithGoogle().then(() => {
      push("/");
    });
  }

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    await signUpWithEmailAndPassword(values).then(() => {
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
            <CardTitle>Criar conta:</CardTitle>
            <CardDescription>Inscreva-se para começar.</CardDescription>
          </CardHeader>

          <CardContent className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe seu nome:"
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

            <NextLink
              href={"/recuperar-senha"}
              className="ml-auto text-xs text-muted-foreground hover:underline"
            >
              Esqueceu sua senha?
            </NextLink>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Criar"
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
                Já possui uma conta?
              </span>

              <Separator className="shrink" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => push("/auth/sign-in")}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
