import { apiClient } from "./api-client";

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

// type SignUpResponse = never;

export async function signUp({ name, email, password }: SignUpRequest) {
  await apiClient.post("auth/sign-up", {
    json: { name, email, password },
  });

  // redirect("/auth/sign-in");
}
