"use server";

import { apiClient } from "../api-client";

export async function deleteUser(id: string): Promise<unknown> {
  const result = await apiClient.delete(`users/${id}`);

  return result;
}
