"use server";

import type { CustomerDto } from "@/data/dto/customer-dto";

import { apiClient } from "../api-client";

export async function editCustomer({
  id,
  name,
  registerNumber,
  contactType1,
  contact1,
  contactType2,
  contact2,
  address,
  city,
  state,
  zipCode,
  country,
}: CustomerDto): Promise<unknown> {
  const result = await apiClient.put(`customers/${id}`, {
    json: {
      name,
      registerNumber,
      contactType1,
      contact1,
      contactType2,
      contact2,
      address,
      city,
      state,
      zipCode,
      country,
    },
  });

  return result;
}
