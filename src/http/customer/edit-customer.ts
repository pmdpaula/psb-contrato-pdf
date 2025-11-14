"use server";

import type { CustomerDto } from "@/data/dto/customer-dto";

import { apiClient } from "../api-client";

export async function editCustomer({
  id,
  name,
  registerNumber,
  email,
  phoneNumber1,
  phoneNumber2,
  address,
  city,
  state,
  zipCode,
  country,
}: CustomerDto): Promise<unknown> {
  console.log("🚀 ~ editCustomer ~ name:", name);

  const result = await apiClient.put(`customers/${id}`, {
    json: {
      name,
      registerNumber,
      email,
      phoneNumber1,
      phoneNumber2,
      address,
      city,
      state,
      zipCode,
      country,
    },
  });

  return result;
}
