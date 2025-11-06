import { z } from "zod";

export const signInSchema = z.object({
  email: z.email().min(1, "O e-mail é obrigatório."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
