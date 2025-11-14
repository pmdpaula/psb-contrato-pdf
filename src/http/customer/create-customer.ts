"use server";

import type { CreateCustomerDto } from "@/data/dto/customer-dto";

import { apiClient } from "../api-client";

export async function createCustomer({
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
}: CreateCustomerDto): Promise<unknown> {
  const result = await apiClient.post(`customers`, {
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
