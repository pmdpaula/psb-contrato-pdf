import { z } from "zod";

import { userRoleSchema } from "../roles";

export const userSchema = z.object({
  id: z.string(),
  userRole: userRoleSchema,
});

export type User = z.infer<typeof userSchema>;
