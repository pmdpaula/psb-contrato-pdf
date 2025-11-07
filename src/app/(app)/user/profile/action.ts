"use server";

import { HTTPError } from "ky";

import type { ChangePasswordProps } from "@/data/dto/user-dto";
import { changeUserPassword } from "@/http/change-user-password";

export async function changePasswordAction(data: ChangePasswordProps) {
  const { id, currentPassword, newPassword } = data;

  try {
    await changeUserPassword({
      id,
      currentPassword,
      newPassword,
    });
  } catch (error) {
    console.error("🚀 ~ editUserAction:", error);

    if (error instanceof HTTPError) {
      const { message } = await error.response.json();

      if (message === "Invalid current password") {
        return {
          success: false,
          message: "Senha atual incorreta",
          errors: error.response.status,
        };
      }

      return { success: false, message, errors: error.response.status };
    }

    // console.error(error);

    return {
      success: false,
      message: "Something went wrong. Please, try again later.",
      errors: null,
    };
  }

  // redirect("/");
  return {
    success: true,
    message: "Senha alterada com sucesso!",
    errors: null,
  };
}
