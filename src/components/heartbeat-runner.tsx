"use client";

import { useHeartbeat } from "../hooks/use-heart-beat";
import { AuthContext } from "../contexts/auth-context";
import { useContext } from "react";

export function HeartbeatRunner() {
  // Pega o estado global de autenticação
  const { isAuthenticated } = useContext(AuthContext);

  // Chama o hook passando o estado
  useHeartbeat(isAuthenticated);

  // Esse componente não tem visual nenhum, ele só processa o Hook
  return null;
}
