import { UpdateProfileForm } from "../../../components/forms/update-profile-form";
import Profile from "../../../components/profile";
import { meAuthService } from "../../../services/me-auth.service";

interface ProfilePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const params = await searchParams;
  const currentUrl = params.name as "profile" | "edit-profile" | undefined;
  const defaultUrl = !currentUrl ? "profile" : currentUrl;
  const user = await meAuthService();

  if (!user) return <div>Usuário não autenticado.</div>;

  return (
    <div>
      {defaultUrl === "profile" ? (
        <Profile user={user} />
      ) : (
        <UpdateProfileForm
          fullname={user.fullname}
          bio={user?.bio || ""}
          birthday={user.birthDay}
          avatarUrl={user.avatarUrl || ""}
        />
      )}
    </div>
  );
}
