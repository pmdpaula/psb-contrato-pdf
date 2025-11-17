export const customerContactTypeType = {
  OTHER: "OTHER",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  WHATSAPP: "WHATSAPP",
  INSTAGRAM: "INSTAGRAM",
  FACEBOOK: "FACEBOOK",
  TIKTOK: "TIKTOK",
} as const;

export const customerContactTypeDescription = {
  OTHER: "Outro",
  EMAIL: "E-mail",
  PHONE: "Telefone",
  WHATSAPP: "WhatsApp",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  TIKTOK: "TikTok",
} as const;

export type CustomerContactTypeType =
  (typeof customerContactTypeType)[keyof typeof customerContactTypeType];
