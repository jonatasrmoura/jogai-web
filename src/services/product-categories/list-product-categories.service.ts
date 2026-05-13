import { api } from "../../services/api";
import type { ListProductCategoriesResponseDTO } from "./dtos/list-product-categories-response.dto";

type ListProductsType = {
  page: number;
  limit: number;
  name?: string;
};

export async function listProductsService(
  props: ListProductsType,
): Promise<ListProductCategoriesResponseDTO> {
  const params = new URLSearchParams({
    page: props.page.toString(),
    limit: props.limit.toString(),
  });

  if (props.name && props.name.trim().length > 0) {
    params.append("name", props.name.trim());
  }

  const query = params.toString();

  const response = await api<ListProductCategoriesResponseDTO>(
    `/product-categories?${query}`,
    {
      method: "GET",
    },
  );

  if (!response) {
    return {
      data: [],
      meta: { page: props.page, limit: props.limit, total: 0, totalPages: 0 },
    };
  }

  return response;
}
