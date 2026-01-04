import { z } from "zod";

export const signUpSchema = z
  .object({
    displayName: z.string().min(1, "O nome é obrigatório."),
    email: z
      .email("O e-mail informado é inválido.")
      .min(1, "O e-mail é obrigatório."),
    password: z
      .string()
      .min(1, "A senha é obrigatória.")
      .min(6, "A senha deve conter no mínimo 6 caracteres."),
    passwordConfirm: z.string().min(1, "A confirmação de senha é obrigatória."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        message: "As senhas não correspondem.",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
