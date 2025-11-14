"use server";

import type { ChangePasswordProps } from "@/data/dto/user-dto";

import { apiClient } from "../api-client";

export async function changeUserPassword({
  id,
  currentPassword,
  newPassword,
}: ChangePasswordProps): Promise<unknown> {
  const result = await apiClient.patch(`users/${id}/password`, {
    json: {
      currentPassword,
      newPassword,
    },
  });

  return result;
}
