import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // PORT: z.coerce.number().default(3333),

    // DATABASE_URL: z.url(),
    // DATABASE_API_KEY: z.string().min(64).optional(),

    // JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default("15m"),
    JWT_PRIVATE_KEY: z.string().min(64),

    REFRESH_TOKEN_SECRET: z.string().min(32),
    REFRESH_TOKEN_EXPIRES_IN: z.string().default("7d"),

    // GOOGLE_OAUTH_CLIENT_ID: z.string(),
    // GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
    // GOOGLE_OAUTH_REDIRECT_URI: z.url(),
  },
  // clientPrefix: "PUBLIC_",
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.url(),
  },
  runtimeEnv: {
    // PORT: process.env.PORT,

    // DATABASE_API_KEY: process.env.DATABASE_API_KEY,
    // DATABASE_URL: process.env.DATABASE_URL,

    // JWT_SECRET: process.env.JWT_SECRET,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,

    // GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    // GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    // GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
});
