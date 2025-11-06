import { z } from "zod";

export const userRoleSchema = z.union([
  z.literal("ADMIN"),
  z.literal("MEMBER"),
  z.literal("VIEWER"),
]);

export type UserRole = z.infer<typeof userRoleSchema>;
