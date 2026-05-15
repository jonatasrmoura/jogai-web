"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { parseCookies } from "nookies";
import { useRouter, usePathname } from "next/navigation";

import { PrivateHeader } from "../components/header/private-header";
import { PublicHeader } from "../components/header/public-header";

import { logoutService } from "../services/logout.service";
import { signInAuthService } from "../services/sign-in-auth.service";
import { meAuthService } from "../services/me-auth.service";

import type { ShowUserDTO } from "../types/users/show-user.dto";
import type { RegisterUserAuthDTO } from "../types/users/register-user-auth.dto";
import { setAccessTokenCookies } from "../config/cookies/auth/set-access-token-cookies";
import { errorMessage } from "../lib/messages/error-message";
import { registerUserAuthService } from "../services/register-user-auth.service";
import { destroyAccessTokenCookies } from "../config/cookies/auth/destroy-access-token-cookies";
import { updateAvatarService } from "../services/user-auth/update-avatar.service";
import { successMessage } from "../lib/messages/success-message";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: ShowUserDTO | null;
  isAuthenticated: boolean;
  setUserIsUpdate: Dispatch<SetStateAction<boolean>>;
  handleLogout(): Promise<void>;
  handleSignIn(email: string, password: string): Promise<void>;
  handleSignUp(data: RegisterUserAuthDTO): Promise<void>;
  handleUpdateAvatar(data: FormData): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<ShowUserDTO | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userIsUpdate, setUserIsUpdate] = useState<boolean>(true);

  const isAuthPage = pathname === "/login";

  useEffect(() => {
    if (!userIsUpdate) return;

    setLoading(true);

    const { "jogai-app.token": token } = parseCookies();

    if (token) {
      meAuthService()
        .then((userData) => {
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        })
        .finally(() => {
          setUserIsUpdate(false);
        });
    }

    setLoading(false);
  }, [userIsUpdate]);

  async function handleLogout(): Promise<void> {
    await logoutService();
    setUser(null);
    setIsAuthenticated(false);
    destroyAccessTokenCookies();
    router.push("/login");
  }

  async function handleUpdateAvatar(data: FormData) {
    try {
      const result = await updateAvatarService(data);

      if (!result) {
        return errorMessage(
          "Erro ao atualizar Avatar!",
          "Verifique seu arquivo de imagem e tente novamente.",
        );
      }

      setUserIsUpdate(true);
      successMessage("Avatar atualizado com sucesso!", "");
    } catch (error: any) {
      return errorMessage(
        error.message || "Erro ao atualizar Avatar!",
        "Verifique seu arquivo de imagem e tente novamente.",
      );
    }
  }

  async function handleSignIn(email: string, password: string): Promise<void> {
    try {
      const accessToken = await signInAuthService(email, password);

      if (!accessToken) {
        return errorMessage(
          "Erro ao tentar fazer login",
          "Credenciais inválidas",
        );
      }

      setAccessTokenCookies(accessToken);

      const userData = await meAuthService();

      if (!userData) {
        return errorMessage(
          "Erro ao buscar dados do usuário",
          "Tente tente fazer login novamente ou procure ajuda com o suporte.",
        );
      }

      setUser(userData);
      setIsAuthenticated(true);
      router.push("/marketplace");
    } catch (error: any) {
      return errorMessage(
        error.message || "Erro de login",
        "Credenciais inválidas.",
      );
    }
  }

  async function handleSignUp(data: RegisterUserAuthDTO): Promise<void> {
    const accessToken = await registerUserAuthService(data);

    if (!accessToken) {
      return errorMessage(
        "Erro ao criar conta",
        "Credenciais inválidas, tente novamente.",
      );
    }

    setAccessTokenCookies(accessToken);

    const userData = await meAuthService();

    if (!userData) {
      return errorMessage(
        "Erro ao buscar dados do usuário",
        "Tente tente fazer login novamente ou procure ajuda com o suporte.",
      );
    }

    setUser(userData);
    setIsAuthenticated(true);
    router.push("/marketplace");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleSignIn,
        handleSignUp,
        handleLogout,
        setUserIsUpdate,
        handleUpdateAvatar,
      }}
    >
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center font-bold text-2xl text-primary">
          Carregando...
        </div>
      ) : (
        <>
          {/* O Pulo do Gato: Só renderiza o header se NÃO for a página de login */}
          {!isAuthPage &&
            (isAuthenticated ? <PrivateHeader /> : <PublicHeader />)}
        </>
      )}
      {children}
    </AuthContext.Provider>
  );
}
