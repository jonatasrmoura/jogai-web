import { ShowProductCategoryResponseDTO } from "./show-product-category-response.dto";

export interface ListProductCategoriesResponseDTO {
  meta: PaginationMeta;
  data: ShowProductCategoryResponseDTO[];
}
