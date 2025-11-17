import { z } from "zod";

import { customerContactTypeType } from "@/lib/customer-contact-type";

export const createCustomerDtoSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres.").max(100),

  registerNumber: z
    .string()
    .nullable()
    .or(z.literal("")) // Permite string vazia como valor válido
    .transform((val) => (val === "" ? null : val))
    .refine((val) => {
      if (!val) return true; // Permite null
      return /^\d+$/.test(val) && (val.length === 11 || val.length === 14);
    }, "O número de registro deve ter 11 (CPF) ou 14 (CNPJ) caracteres e conter apenas dígitos."),

  contactType1: z
    .enum(Object.values(customerContactTypeType) as [string, ...string[]])
    .nullable()
    // .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),

  contact1: z
    .string()
    .nullable()
    // .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),

  contactType2: z
    .enum(Object.values(customerContactTypeType) as [string, ...string[]])
    .nullable()
    // .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),

  contact2: z
    .string()
    .nullable()
    // .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),

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
// .superRefine((data, ctx) => {
//   // Validação condicional: se contactType1 for fornecido, contact1 deve ser obrigatório
//   if (data.contactType1 && !data.contact1) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message:
//         "O contato 1 é obrigatório quando o tipo de contato 1 é selecionado.",
//       path: ["contact1"],
//     });
//   }

//   // Validação condicional: se contactType2 for fornecido, contact2 deve ser obrigatório
//   if (data.contactType2 && !data.contact2) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message:
//         "O contato 2 é obrigatório quando o tipo de contato 2 é selecionado.",
//       path: ["contact2"],
//     });
//   }
// });

export type CreateCustomerDto = z.infer<typeof createCustomerDtoSchema>;

export const customerDtoSchema = z.object({
  id: z.cuid2(),
  ...createCustomerDtoSchema.shape,
});

export type CustomerDto = z.infer<typeof customerDtoSchema>;
