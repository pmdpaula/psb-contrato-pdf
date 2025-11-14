"use server";

import type { CustomerDto } from "@/data/dto/customer-dto";

import { apiClient } from "../api-client";

interface GetCustomersResponse {
  customers: CustomerDto[];
}

export async function getCustomers(): Promise<GetCustomersResponse> {
  const result = await apiClient.get("customers").json<GetCustomersResponse>();
  return result;
}
