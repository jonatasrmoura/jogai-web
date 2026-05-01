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

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: ShowUserDTO | null;
  isAuthenticated: boolean;
  handleLogout(): Promise<void>;
  handleSignIn(email: string, password: string): Promise<void>;
  handleSignUp(data: RegisterUserAuthDTO): Promise<void>;
  setUserIsUpdate: Dispatch<SetStateAction<boolean>>;
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

  async function handleSignIn(email: string, password: string): Promise<void> {
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
