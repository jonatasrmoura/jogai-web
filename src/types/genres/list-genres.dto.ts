import type { GetGenreDTO } from "./get-genre.dto.js";

export interface ListGenresDTO {
  data: GetGenreDTO[];
  metadata: PaginationMeta;
}
