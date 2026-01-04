import { z } from "zod";

export const SchemaCreateInstitute = z.object({
  institute: z
    .string()
    .min(3, "O nome do campus deve ter pelo menos 3 caracteres"),
  campus: z
    .string()
    .min(3, "O nome do campus deve ter pelo menos 3 caracteres"),
});

export type CreateInstituteInput = z.infer<typeof SchemaCreateInstitute>;
