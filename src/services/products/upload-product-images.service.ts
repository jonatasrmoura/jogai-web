import { api } from "../api";

export interface UploadProductImagesResponse {
  imageUrls: string[];
}

export async function uploadProductImagesService(
  formData: FormData,
): Promise<UploadProductImagesResponse> {
  // Envia apenas as imagens via multipart/form-data
  const response = await api<UploadProductImagesResponse>(
    "/products/upload-images",
    {
      method: "POST",
      body: formData,
    },
  );

  return response;
}
