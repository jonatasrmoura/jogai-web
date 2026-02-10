"use server";
import type { ShowUserDTO } from "../types/users/show-user.dto";
import { api } from "./api";

export async function meAuthService(): Promise<ShowUserDTO | false> {
  return api<ShowUserDTO>("/auth/me", {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["update-user-avatar", "update-user-profile"],
    },
  });
}
