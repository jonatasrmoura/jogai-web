declare global {
  export interface ListGamesResponse {
    data: ListGamesDTO[];
    meta: PaginationMeta;
  }
}

export {};
