import { z } from "zod";

export const addMemberSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("O e-mail informado é inválido."),

  role: z.enum(["admin", "editor", "reader"]).refine((value) => !!value, {
    message: "A permissão é obrigatória.",
  }),
});

export type AddMemberFormValues = z.infer<typeof addMemberSchema>;
