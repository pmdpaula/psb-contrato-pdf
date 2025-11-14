"use server";

import type { UserDto } from "@/data/dto/user-dto";

import { apiClient } from "../api-client";

interface GetProfileResponse {
  user: UserDto;
}

export async function getProfile(): Promise<GetProfileResponse> {
  const result = await apiClient.get("profile").json<GetProfileResponse>();

  return result;
}
