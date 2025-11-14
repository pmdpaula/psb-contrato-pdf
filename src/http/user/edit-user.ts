"use server";

import type { UserDto } from "@/data/dto/user-dto";

import { apiClient } from "../api-client";

export async function editUser({
  id,
  name,
  email,
  avatarUrl,
  phoneNumber1,
  phoneNumber2,
  userRole,
}: UserDto): Promise<unknown> {
  const result = await apiClient.put(`users/${id}`, {
    json: {
      name,
      email,
      avatarUrl,
      phoneNumber1,
      phoneNumber2,
      userRole,
    },
  });

  return result;
}
