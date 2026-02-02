import Profile from "../../../components/profile";
import { meAuthService } from "../../../services/me-auth.service";

export default async function ProfilePage() {
  const user = await meAuthService();

  if (!user) return <div>Usuário não autenticado.</div>;

  return <Profile user={user} />;
}
