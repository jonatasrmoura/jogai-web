import { api } from "../api";
import type { CreateProductResponseDTO } from "../../types/products/create-product-response.dto";
import { CreateProductDTO } from "../../types/products/create-product.dto";

export async function createProductService(
  data: CreateProductDTO,
): Promise<CreateProductResponseDTO> {
  const newProduct = await api<CreateProductResponseDTO>("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return newProduct;
}
