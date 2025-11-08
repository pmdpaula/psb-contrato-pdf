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

// Change Password Schema and Type

export const changeUserPasswordSchema = z.object({
  id: z.cuid2(),
  currentPassword: z
    .string("A senha atual é obrigatória.")
    .min(6, "A senha atual deve ter pelo menos 6 caracteres."),
  newPassword: z
    .string("A nova senha é obrigatória.")
    .min(6, "A nova senha deve ter pelo menos 6 caracteres."),
});

export type ChangePasswordProps = z.infer<typeof changeUserPasswordSchema>;

// Sign Up Schema and Type

export const signUpSchema = z
  .object({
    name: z
      .string()
      .refine((value) => value.split(" ").length > 1, {
        message: "Por favor, entre com o nome completo.",
      })
      .min(1, { message: "Nome é obrigatório." }),
    email: z.email({ message: "Por favor, entre com um e-mail válido." }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem.",
    path: ["password_confirmation"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Sign in Schema and Type

export const signInSchema = z.object({
  email: z.email({ message: "Por favor, entre com um e-mail válido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export type SignInFormData = z.infer<typeof signInSchema>;
