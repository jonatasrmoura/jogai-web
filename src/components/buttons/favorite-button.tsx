"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

import { toggleFavoriteProductService } from "../../services/products/toggle-favorite-product.service";
import { errorMessage } from "../../lib/messages/error-message";
import { successMessage } from "../../lib/messages/success-message";

interface FavoriteButtonProps {
  productName: string;
  productUuid: string;
  isFavorite: boolean;
  className?: string;
}

export function FavoriteButton({
  productUuid,
  productName,
  isFavorite: initialIsFavorite,
  className,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetFavoriteProduct = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    // 1. Guarda o estado original antes da mudança
    const previousState = isFavorite;

    // 2. Optimistic UI: Muda a tela IMEDIATAMENTE (o coração enche ou esvazia)
    setIsFavorite(!previousState);
    setIsLoading(true);

    try {
      console.log("Toggling favorite for product:", productUuid);
      const result = await toggleFavoriteProductService(productUuid);

      if (!result) {
        // Se a API falhar, restauramos o estado original que guardamos
        setIsFavorite(previousState);
        errorMessage(
          "Erro",
          "Não foi possível atualizar os favoritos no momento.",
        );
        return; // Retorno para parar a execução
      }

      // Mensagem de sucesso apenas se o produto foi ADICIONADO aos favoritos
      if (result.favorited === true) {
        successMessage(
          "Na Lista de Desejos!",
          `${productName} foi adicionado aos favoritos.`,
        );
      }
    } catch {
      // Se a conexão cair, também restauramos o estado original
      setIsFavorite(previousState);
      errorMessage("Erro de conexão", "Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSetFavoriteProduct}
      disabled={isLoading}
      aria-label={
        isFavorite
          ? `Remover ${productName} dos favoritos`
          : `Adicionar ${productName} aos favoritos`
      }
      className={cn(
        "absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110",
        isFavorite
          ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(79,70,229,0.4)]"
          : "bg-background/60 text-muted-foreground hover:text-foreground hover:bg-background/90 border border-border/50",
        className,
      )}
    >
      <Heart
        className={cn(
          "w-4 h-4 transition-all duration-300",
          isFavorite ? "scale-110" : "scale-100",
        )}
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}
