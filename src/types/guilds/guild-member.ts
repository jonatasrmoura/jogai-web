export interface GuildMember {
  userUuid: string;
  nickname: string;
  avatarUrl: string | null;
  roleName: string;
  roleLevel: number;
  isAdmin: boolean;
  joinedAt: string;
  isOnline: boolean;
}
