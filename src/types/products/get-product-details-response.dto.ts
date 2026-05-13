import type { ProductConditionEnum } from "../../enums/product-condition.enum";
import type { ProductImageDTO } from "./product-image.dto";

export interface ProductSellerDTO {
  uuid: string;
  fullname: string;
  avatarUrl: string | null;
}

export interface GetProductDetailsResponseDTO {
  uuid: string;
  id: number;
  name: string;
  brand: string;
  model: string;
  gtin: string | null;
  attributes: Record<string, any> | null;
  quantity: number;
  condition: ProductConditionEnum;
  isDigital: boolean;
  value: number;
  description: string;
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date | null;
  seller: ProductSellerDTO;
  images: ProductImageDTO[];
  category: {
    uuid: string;
    name: string;
  };
  isFavorite: boolean;
}
