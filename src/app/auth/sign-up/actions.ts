"use server";

import { HTTPError } from "ky";

import type { SignUpFormData } from "@/data/dto/user-dto";
import { signUp } from "@/http/sign-up";

export async function signUpAction(data: SignUpFormData) {
  const { name, email, password } = data;

  try {
    await signUp({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json();

      return { success: false, message, errors: null };
    }

    console.error(error);

    return {
      success: false,
      message: "Algo deu errado. Tente novamente mais tarde.",
      errors: null,
    };
  }

  return {
    success: true,
    message: "Cadastro realizado com sucesso!",
    errors: null,
  };
}
