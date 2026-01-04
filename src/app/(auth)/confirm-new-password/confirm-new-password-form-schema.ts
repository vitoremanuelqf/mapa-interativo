import { z } from "zod";

export const confirmNewPasswordSchema = z
  .object({
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

export type ConfirmNewPasswordFormValues = z.infer<
  typeof confirmNewPasswordSchema
>;
