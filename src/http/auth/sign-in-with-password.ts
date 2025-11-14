import type { SignInFormData } from "@/data/dto/user-dto";

import { apiClient } from "../api-client";

// interface SignInWithPasswordRequest {
//   email: string;
//   password: string;
// }

interface SignInWithPasswordResponse {
  access_token: string;
}

export async function signInWithPassword({ email, password }: SignInFormData) {
  const result = await apiClient
    .post("users/sessions", {
      json: { email, password },
    })
    .json<SignInWithPasswordResponse>();

  return result;
}
