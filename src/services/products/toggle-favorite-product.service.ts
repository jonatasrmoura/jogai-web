"use server";
import { revalidateTag } from "next/cache";

import { api } from "../api";
import { ToggleFavoriteProductResponseDTO } from "../../types/products/toggle-favorite-product-response.dto";

export async function toggleFavoriteProductService(
  productUuid: string,
): Promise<ToggleFavoriteProductResponseDTO | null> {
  const result = await api<ToggleFavoriteProductResponseDTO>(
    `/products/${productUuid}/favorite`,
    {
      method: "POST",
      body: JSON.stringify(null),
    },
  );

  if (!result) {
    return null;
  }

  revalidateTag("toggle-favorite-product");

  return { favorited: result.favorited, message: result.message };
}
