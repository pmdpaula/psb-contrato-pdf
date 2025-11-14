import { z } from "zod";

export const createCustomerDtoSchema = z.object({
  name: z
    .string({ error: "O nome é obrigatório." })
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(100),
  registerNumber: z
    .string()
    .regex(/^\d+$/, "O número de registro deve conter apenas dígitos.")
    .refine(
      (val) => val.length === 11 || val.length === 14,
      "O número de registro deve ter 11 (CPF) ou 14 (CNPJ) caracteres.",
    )
    .nullable()
    .or(z.literal("")), // Permite string vazia como valor válido
  email: z.email().nullable().or(z.literal("")), // Permite string vazia como valor válido
  phoneNumber1: z
    .string()
    .regex(/^\d+$/, "O número de telefone deve conter apenas dígitos.")
    .nullable()
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
    .regex(/^\d+$/, "O número de telefone deve conter apenas dígitos.")
    .nullable()
    .or(z.literal("")) // Permite string vazia como valor válido
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
  address: z.string().max(200).nullable().or(z.literal("")),
  city: z.string().max(100).nullable().or(z.literal("")),
  state: z.string().max(100).nullable().or(z.literal("")),
  zipCode: z
    .string()
    .regex(/^\d+$/, "O CEP deve conter apenas dígitos.")
    .max(20)
    .nullable()
    .or(z.literal("")), // Permite string vazia como valor válido
  country: z.string().max(100).nullable().or(z.literal("")),
});

export type CreateCustomerDto = z.infer<typeof createCustomerDtoSchema>;

export const customerDtoSchema = z.object({
  id: z.cuid2(),
  ...createCustomerDtoSchema.shape,
  // name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres.").max(100),
  // registerNumber: z
  //   .string()
  //   .regex(/^\d+$/, "O número de registro deve conter apenas dígitos.")
  //   .refine(
  //     (val) => val.length === 11 || val.length === 14,
  //     "O número de registro deve ter 11 (CPF) ou 14 (CNPJ) caracteres.",
  //   )
  //   .nullable(),
  // email: z.email().nullable(),
  // phoneNumber1: z
  //   .string()
  //   .regex(/^\d+$/, "O número de telefone deve conter apenas dígitos.")
  //   .nullable()
  //   .or(z.literal("")) // Permite string vazia como valor válido
  //   .transform((val) => (val === "" ? null : val)) // Transforma string vazia em null
  //   .refine(
  //     (val) => {
  //       if (!val) return true; // aceita null ou undefined
  //       return val.length >= 10 && val.length <= 15;
  //     },
  //     {
  //       message: "O número de telefone deve ter entre 10 e 15 caracteres.",
  //     },
  //   ), // Aplica validação de tamanho SOMENTE quando o valor não for null ou undefined
  // phoneNumber2: z
  //   .string()
  //   .regex(/^\d+$/, "O número de telefone deve conter apenas dígitos.")
  //   .nullable()
  //   .transform((val) => (val === "" ? null : val))
  //   .refine(
  //     (val) => {
  //       if (!val) return true; // aceita null ou undefined
  //       return val.length >= 10 && val.length <= 15;
  //     },
  //     {
  //       message: "O número de telefone deve ter entre 10 e 15 caracteres.",
  //     },
  //   ),
  // address: z.string().max(200).nullable(),
  // city: z.string().max(100).nullable(),
  // state: z.string().max(100).nullable().default("RJ"),
  // zipCode: z
  //   .string()
  //   .regex(/^\d+$/, "O CEP deve conter apenas dígitos.")
  //   .max(20)
  //   .nullable(),
  // country: z.string().max(100).nullable().default("Brasil"),
});

export type CustomerDto = z.infer<typeof customerDtoSchema>;
