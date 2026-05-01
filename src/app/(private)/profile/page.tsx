import { UpdateProfileForm } from "../../../components/forms/update-profile-form";
import { Profile } from "../../../components/profile";
import { meAuthService } from "../../../services/me-auth.service";

interface ProfilePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const params = await searchParams;
  const currentUrl = params.name as "profile" | "edit-profile" | undefined;
  const defaultUrl = !currentUrl ? "profile" : currentUrl;
  const user = await meAuthService();

  if (!user) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center bg-background text-foreground">
        <p className="text-xl font-bold animate-pulse">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {defaultUrl === "profile" ? (
        <Profile user={user} />
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <UpdateProfileForm
            fullname={user.fullname}
            bio={user?.bio || ""}
            birthday={user.birthDay}
            avatarUrl={user.avatarUrl || ""}
          />
        </div>
      )}
    </div>
  );
}
