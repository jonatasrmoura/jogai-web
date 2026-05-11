export interface ShowUserDTO {
  uuid: string;
  id: number;
  avatarUrl: string | null;
  nickname: string;
  fullname: string;
  email: string;
  birthDay: string;
  bio: string | null;
  document: string;
  isActive: boolean;
  tag: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
