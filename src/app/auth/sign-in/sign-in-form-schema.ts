import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email("O e-mail informado é inválido.")
    .min(1, "O e-mail é obrigatório."),
  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .min(6, "A senha deve conter no mínimo 6 caracteres."),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
