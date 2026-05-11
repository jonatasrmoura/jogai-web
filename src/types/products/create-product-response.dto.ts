import type { ProductConditionEnum } from "../../enums/product-condition.enum";
import type { ProductImageDTO } from "./product-image.dto";

export interface CreateProductResponseDTO {
  uuid: string;
  id: number;
  userUuid: string;
  name: string;
  platform: string;
  condition: ProductConditionEnum;
  value: string;
  description: string;
  isDigital: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  images: ProductImageDTO[];
}
