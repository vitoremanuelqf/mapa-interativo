"use client";

import NextLink from 'next/link'

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Label } from "@/components/ui/label";
import { SignInFormValues, signInSchema } from "./sign-in-form-schema";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function SignInForm() {
  const { push } = useRouter()
  const loading = false

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignInWithGoogle() {
    console.log("🚀 ~ handleSignInWithGoogle ~ handleSignInWithGoogle:")
  }

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=""
      >
        <Card>
          <CardHeader>
              <CardTitle>Acessar conta:</CardTitle>
              <CardDescription>Entre com suas credenciais para acessar sua conta.</CardDescription>
          </CardHeader>

          <CardContent className="">
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
                  <FormMessage className="text-xs" />
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
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <NextLink href={'/recuperar-senha'} legacyBehavior>
              <a className="min-w-max text-right text-xs text-muted-foreground hover:underline">
                Esqueceu sua senha?
              </a>
            </NextLink>

            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
            </Button>

            <div className="flex h-auto w-full items-center gap-2">
              <Separator className="shrink" />

              <span className="min-w-max text-xs text-muted-foreground">
                Outras opções de entrada
              </span>

              <Separator className="shrink" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleSignInWithGoogle}
              disabled={loading}
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : 'Google'}
            </Button>

            <div className="flex h-auto w-full items-center gap-2">
              <Separator className="shrink" />

              <span className="min-w-max text-xs text-muted-foreground">
                Não tem uma conta?
              </span>

              <Separator className="shrink" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => push('/criar-conta')}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Criar conta'
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
