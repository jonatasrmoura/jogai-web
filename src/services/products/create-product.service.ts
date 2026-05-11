import { api } from "../api";
import { CreateProductResponseDTO } from "../../types/products/create-product-response.dto";

export async function createProductService(formData: FormData) {
  const newProduct = await api<CreateProductResponseDTO>("/products", {
    method: "POST",
    body: formData,
  });

  if (!newProduct) {
    return null;
  }

  return newProduct;
}
