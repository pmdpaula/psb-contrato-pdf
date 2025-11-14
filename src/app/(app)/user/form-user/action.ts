"use server";

import { HTTPError } from "ky";

import { type UserDto } from "@/data/dto/user-dto";
import { editUser } from "@/http/user/edit-user";

export async function editUserAction(data: UserDto) {
  const { id, name, email, avatarUrl, phoneNumber1, phoneNumber2, userRole } =
    data;

  try {
    await editUser({
      id,
      name,
      email,
      avatarUrl,
      phoneNumber1,
      phoneNumber2,
      userRole,
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json();

      return { success: false, message, errors: error.response.status };
    }

    // console.error(error);
    console.error("🚀 ~ editUserAction:", error);

    return {
      success: false,
      message: "Something went wrong. Please, try again later.",
      errors: null,
    };
  }

  // redirect("/");
  return {
    success: true,
    message: "Usuário alterado com sucesso!",
    errors: null,
  };
}
