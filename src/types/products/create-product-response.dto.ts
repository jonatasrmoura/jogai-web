import type { ProductConditionEnum } from "../../enums/product-condition.enum";

export interface CreateProductResponseDTO {
  uuid: string;
  id: number;
  sellerUuid: string; // Atualizado (era userUuid)
  name: string;
  brandOrPlatform: string; // Atualizado
  condition: ProductConditionEnum;
  value: string; // Postgres geralmente retorna decimais como string
  description: string;
  isDigital: boolean;
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "INACTIVE"; // Novo
  createdAt: string; // Datas convertidas para string no JSON
  updatedAt: string | null;
  deletedAt: string | null;
  category: {
    uuid: string;
    name: string;
  };
  images: {
    uuid: string;
    url: string;
    isPrimary: boolean;
    order: number;
  }[];
}
