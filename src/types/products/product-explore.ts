import { ProductConditionEnum } from "../../enums/product-condition.enum";

declare global {
  export interface ListProductsDTO {
    uuid: string;
    id: number;
    name: string;
    brandOrPlatform: string | null;
    condition: ProductConditionEnum;
    value: number;
    description: string;
    status: "AVAILABLE" | "RESERVED" | "SOLD" | "INACTIVE";
    images: {
      url: string;
      order: number;
      isPrimary: boolean;
    }[];
    category: {
      uuid: string;
      name: string;
    };
    isFavorite: boolean;
  }
}

export {};
