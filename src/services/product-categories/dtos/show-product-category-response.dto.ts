export interface ShowProductCategoryResponseDTO {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
