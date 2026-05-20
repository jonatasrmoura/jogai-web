"use client";
import { useEffect } from "react";
import { api } from "../services/api"; // O seu cliente do axios/fetch

export function useHeartbeat(isAuthenticated: boolean) {
  useEffect(() => {
    if (!isAuthenticated) return;

    // Extraímos a função para evitar repetição
    const sendPresence = async () => {
      try {
        await api("/users/presence", {
          method: "PATCH",
          // É melhor enviar um objeto vazio do que null
          body: JSON.stringify({}),
        });
      } catch (err) {
        console.error("Falha no heartbeat:", err);
      }
    };

    // Dispara a primeira vez
    sendPresence();

    // Configura o intervalo
    const intervalId = setInterval(sendPresence, 10000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);
}
