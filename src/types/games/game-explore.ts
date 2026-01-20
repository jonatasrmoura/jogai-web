declare global {
  export interface ListGamesDTO {
    uuid: string;
    id: number;
    name: string;
    platform: string;
    condition: string;
    value: number;
    description: string;
    sold: boolean;
    images: Array<{ url: string; position: number }>;
    genres: Array<{ uuid: string; name: string }>;
  }
}

export {};
