import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z
    .email("O e-mail informado é inválido.")
    .min(1, "O e-mail é obrigatório."),
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
