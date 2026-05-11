declare global {
  export interface ListProductsResponse {
    data: ListProductsDTO[];
    meta: PaginationMeta;
  }
}

export {};
