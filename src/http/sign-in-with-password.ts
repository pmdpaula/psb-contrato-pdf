import { apiClient } from "./api-client";

interface SignInWithPasswordRequest {
  email: string;
  password: string;
}

interface SignInWithPasswordResponse {
  access_token: string;
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await apiClient
    .post("users/sessions", {
      json: { email, password },
    })
    .json<SignInWithPasswordResponse>();

  return result;
}
