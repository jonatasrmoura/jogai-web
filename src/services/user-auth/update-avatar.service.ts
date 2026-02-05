"use server";
import { revalidateTag } from "next/cache";
import { api } from "../api";

interface UpdateAvatarResponse {
  message: string;
  avatarUrl: string;
}

export async function updateAvatarService(
  formData: FormData,
): Promise<UpdateAvatarResponse | null> {
  const response = await api<UpdateAvatarResponse>("/users/profile/avatar", {
    method: "PATCH",
    body: formData,
  });

  if (!response) return null;

  revalidateTag("update-user-avatar");

  return response;
}
