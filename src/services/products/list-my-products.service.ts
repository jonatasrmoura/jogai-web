import { api } from "../api";

interface ListMyProductsServiceRequest {
  status?: "AVAILABLE" | "RESERVED" | "SOLD" | "INACTIVE";
  page: number;
  limit: number;
  name?: string;
  brandOrPlatform?: string; // Atualizado
  condition?: string;
  isDigital?: boolean;
}

export async function listMyProductsService(
  props: ListMyProductsServiceRequest,
): Promise<ListProductsDTO[]> {
  const params = new URLSearchParams({
    page: props.page.toString(),
    limit: props.limit.toString(),
  });

  // Filtramos pelo novo Status em vez da antiga flag "sold"
  if (props.status) params.append("status", props.status);

  if (props.name) params.append("name", props.name);
  if (props.brandOrPlatform)
    params.append("brandOrPlatform", props.brandOrPlatform);
  if (props.condition) params.append("condition", props.condition);
  if (props.isDigital !== undefined) {
    params.append("isDigital", props.isDigital ? "true" : "false");
  }

  const myProducts = await api<ListProductsResponse>(
    `/products/me?${params.toString()}`,
    {
      method: "GET",
    },
  );

  if (!myProducts || !myProducts.data) return [];

  return myProducts.data;
}
