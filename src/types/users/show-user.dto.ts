export interface ShowUserDTO {
  uuid: string;
  id: number;
  isActive: boolean;
  avatarUrl: string | null;
  fullname: string;
  nickname: string;
  tag: string;
  birthDay: string;
  bio: string | null;
  document: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
