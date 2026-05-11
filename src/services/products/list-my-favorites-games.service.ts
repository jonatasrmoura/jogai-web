import { api } from "../api";

type QueryListMyFavoriteProductService = {
  page: number;
  limit: number;
  name?: string;
  brandOrPlatform?: string;
  condition?: string;
  isDigital?: boolean;
};

export async function listMyFavoritesProductsService(
  props: QueryListMyFavoriteProductService,
): Promise<ListProductsDTO[]> {
  // Tipagem de retorno cravada!

  const params = new URLSearchParams({
    page: props.page.toString(),
    limit: props.limit.toString(),
  });

  if (props.name) params.append("name", props.name);
  if (props.brandOrPlatform)
    params.append("brandOrPlatform", props.brandOrPlatform);
  if (props.condition) params.append("condition", props.condition);
  if (props.isDigital !== undefined) {
    params.append("isDigital", props.isDigital ? "true" : "false");
  }

  const products = await api<ListProductsResponse>(
    `/products/favorites?${params.toString()}`,
    {
      method: "GET",
    },
  );

  // Defesa contra retornos vazios ou erros da API
  if (!products || !products.data) return [];

  // O array já vem no formato do DTO, não precisa fazer o .map() manualmente!
  return products.data;
}
