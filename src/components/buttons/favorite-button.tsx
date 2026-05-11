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
  className?: string; // Permite que o componente pai ajuste a posição se necessário
}

export function FavoriteButton({
  productUuid,
  productName,
  isFavorite: initialIsFavorite,
  className,
}: FavoriteButtonProps) {
  // Controle de estado local para resposta visual imediata (Optimistic UI)
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetFavoriteProduct = async (e: React.MouseEvent) => {
    // Impede que o clique no coração ative o Link do Card que está por baixo dele
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    // Atualiza a interface na mesma hora para o usuário sentir o clique fluido
    setIsFavorite(!isFavorite);
    setIsLoading(true);

    try {
      const result = await toggleFavoriteProductService(productUuid);

      if (!result) {
        // Se a API falhar, desfazemos a animação do coração
        setIsFavorite(isFavorite);
        return errorMessage(
          "Erro",
          "Não foi possível atualizar os favoritos no momento.",
        );
      }

      // Mensagem de sucesso apenas se o jogo foi ADICIONADO aos favoritos
      if (result.favorited === true) {
        successMessage(
          "Na Lista de Desejos!",
          `${productName} foi adicionado aos favoritos.`,
        );
      }
    } catch {
      setIsFavorite(isFavorite);
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
        // O pulo do gato: preenche o coração se for favorito
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}
