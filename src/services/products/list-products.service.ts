import { api } from "../../services/api";

type ListProductsType = {
  page: number;
  limit: number;
  name?: string;
  brandOrPlatform?: string;
  condition?: string;
  categoryUuid?: string;
  isDigital?: boolean;
};

export async function listProductsService(
  props: ListProductsType,
): Promise<ListProductsResponse> {
  // Lembre-se de importar essa tipagem!

  // 1. Instanciamos com os parâmetros obrigatórios
  const params = new URLSearchParams({
    page: props.page.toString(),
    limit: props.limit.toString(),
  });

  // 2. Validação Estrita (Ignora null, undefined, strings vazias e strings só com espaços)
  if (props.name && props.name.trim().length > 0) {
    params.append("name", props.name.trim());
  }

  if (props.brandOrPlatform && props.brandOrPlatform.trim().length > 0) {
    params.append("brandOrPlatform", props.brandOrPlatform.trim());
  }

  if (props.condition && props.condition.trim().length > 0) {
    params.append("condition", props.condition.trim());
  }

  if (props.categoryUuid && props.categoryUuid.trim().length > 0) {
    params.append("categoryUuid", props.categoryUuid.trim());
  }

  // Tratamento específico para booleanos (false é válido, então não podemos usar if(props.isDigital))
  if (props.isDigital !== undefined && props.isDigital !== null) {
    params.append("isDigital", props.isDigital ? "true" : "false");
  }

  // 3. Montamos a URL.
  // Se não tiver filtros, ela sairá limpa: "page=1&limit=10"
  const query = params.toString();

  const response = await api<ListProductsResponse>(`/products?${query}`, {
    method: "GET",
  });

  // 4. Fallback de segurança caso a API caia
  if (!response) {
    return {
      data: [],
      meta: { page: props.page, limit: props.limit, total: 0, totalPages: 0 },
    };
  }

  return response;
}
