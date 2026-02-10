"use server";
import { revalidateTag } from "next/cache";

import { api } from "../api";
import type { UpdateUserProfileDTO } from "../../types/users/update-user-profile.dto";

interface UpdateAvatarResponse {
  user: {
    uuid: string;
    fullname: string;
    bio: string | null;
    birthday: string;
    avatarUrl: string | null;
  };
}

export async function updateUserProfileService(
  data: UpdateUserProfileDTO,
): Promise<UpdateAvatarResponse | null> {
  const response = await api<UpdateAvatarResponse>("/users/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response) return null;

  revalidateTag("update-user-profile");

  return response;
}
