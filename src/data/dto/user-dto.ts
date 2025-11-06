import { z } from "zod";

export const userDtoSchema = z.object({
  id: z.cuid2(),
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres.").max(100),
  email: z.email(),
  avatarUrl: z
    .url()
    .nullable()
    .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),
  phoneNumber1: z
    .string()
    .nullable()
    // .optional()
    .or(z.literal("")) // Permite string vazia como valor válido
    .transform((val) => (val === "" ? null : val)) // Transforma string vazia em null
    .refine(
      (val) => {
        if (!val) return true; // aceita null ou undefined
        return val.length >= 10 && val.length <= 15;
      },
      {
        message: "O número de telefone deve ter entre 10 e 15 caracteres.",
      },
    ), // Aplica validação de tamanho SOMENTE quando o valor não for null ou undefined
  phoneNumber2: z
    .string()
    .nullable()
    // .optional()
    // .or(z.literal(""))
    .transform((val) => (val === "" ? null : val))
    .refine(
      (val) => {
        if (!val) return true; // aceita null ou undefined
        return val.length >= 10 && val.length <= 15;
      },
      {
        message: "O número de telefone deve ter entre 10 e 15 caracteres.",
      },
    ),
  userRole: z.enum(["ADMIN", "MEMBER", "VIEWER"]),
});

export type UserDto = z.infer<typeof userDtoSchema>;
