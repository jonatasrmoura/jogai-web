declare global {
  export interface PaginationQuery {
    page?: number; // default 1
    limit?: number; // default 10
  }

  export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}

export {};
