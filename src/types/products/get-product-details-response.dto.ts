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
  platform: string;
  condition: ProductConditionEnum;
  isDigital: boolean;
  isFavorite: boolean;
  value: number;
  description: string;
  sold: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  user: ProductSellerDTO;
  images: ProductImageDTO[];
}
