"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Componentes UI
import { InputImageFile } from "../../../components/inputs/input-image-file";
import { InputLabel } from "../../../components/inputs/input-label";
import { SelectLabel } from "../../../components/selects/select-label";
import { Button } from "../../../components/ui/button";
import { TextAreaLabel } from "../../inputs/text-area-label";

// Schemas e Tipagens
import { createProductSchema } from "./new-product-schema";
import type { CreateProductDTO } from "../../../types/products/create-product.dto"; // Ajuste o caminho
import { ProductConditionEnum } from "../../../enums/product-condition.enum";

// Mocks e Services
import { listConditionMock } from "../../../utils/mocks/list-condition-mock";
import { uploadProductImagesService } from "../../../services/products/upload-product-images.service";
import { createProductService } from "../../../services/products/create-product.service";
import { errorMessage } from "../../../lib/messages/error-message";
import { successMessage } from "../../../lib/messages/success-message";
import { listProductsService } from "../../../services/product-categories/list-product-categories.service";
import { ShowProductCategoryResponseDTO } from "../../../services/product-categories/dtos/show-product-category-response.dto";

export function NewProductForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    ShowProductCategoryResponseDTO[]
  >([]);
  const [files, setFiles] = useState<File[]>([]);

  // 1. Hook Form tipado ESTRITAMENTE com os dados da tela
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProductDTO>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  // 2. Gerenciamento das Imagens (Preview)
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const filesArray = Array.from(selectedFiles);

    if (previews.length + filesArray.length > 5) {
      alert("Você pode enviar no máximo 5 imagens");
      return;
    }

    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setFiles((prev) => [...prev, ...filesArray]);
  }

  // 3. A Função de Submissão que orquestra as duas APIs
  async function onSubmit(data: CreateProductDTO) {
    if (!files || files.length === 0) {
      return errorMessage(
        "Atenção",
        "É necessário enviar pelo menos uma imagem.",
      );
    }

    try {
      // ==============================================================
      // ROTA 1: UPLOAD DE IMAGENS (POST /products/upload-images)
      // ==============================================================
      const imageFormData = new FormData();
      Array.from(files).forEach((file) => {
        imageFormData.append("file", file); // O nome do campo bate com seu Print 1
      });

      const uploadResult = await uploadProductImagesService(imageFormData);

      if (
        !uploadResult ||
        !uploadResult.imageUrls ||
        uploadResult.imageUrls.length === 0
      ) {
        return errorMessage("Erro nas Imagens", "Falha ao fazer upload.");
      }

      // ==============================================================
      // ROTA 2: CRIAÇÃO DO PRODUTO (POST /products)
      // ==============================================================

      // Parser: Transformar R$ da tela em Number da API
      const priceString = data.value.toString();
      const valueNumber = Number(
        (Number(priceString.replace(/\D/g, "")) / 100).toFixed(2),
      );

      // Montamos o Payload seguindo EXATAMENTE o DTO do seu Backend (Print 2)
      const payload: CreateProductDTO = {
        categoryUuid: data.categoryUuid,
        name: data.name,
        brand: data.brand,
        model: data.model,
        gtin: data.gtin && data.gtin.trim() !== "" ? data.gtin : undefined,
        attributes: {
          material: "Diamante", // Exemplo fixo do seu print, pode ser dinâmico depois
          country: "Alemanha",
        },
        quantity: data.quantity,
        condition: data.condition as ProductConditionEnum,
        value: valueNumber,
        description: data.description,
        isDigital: false,
        imageUrls: uploadResult.imageUrls,
      };

      const newProduct = await createProductService(payload);

      if (!newProduct) {
        return errorMessage("Erro", "Não foi possível cadastrar o anúncio.");
      }

      await successMessage("Sucesso!", "Seu anúncio foi publicado.");
      reset();
      setPreviews([]);
    } catch (error) {
      console.error(error);
      errorMessage("Erro de conexão", "Ocorreu um erro inesperado.");
    }
  }

  // Cleanup dos previews da memória
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  useEffect(() => {
    listProductsService({ page: 1, limit: 30 }).then(({ data }) => {
      if (data.length >= 0) {
        setCategories(data);
      }
    });
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Novo Anúncio</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Preencha os dados abaixo para anunciar.
        </p>
      </div>

      {/* RHF repassando os dados nativos, TypeScript não vai chorar aqui */}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {/* === CAMPO DE IMAGENS === */}
        <div className="w-full space-y-4">
          {previews.length > 0 ? (
            <div className="w-full flex gap-4 overflow-x-auto pb-4 pt-2">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative w-[140px] h-[180px] shrink-0 rounded-xl overflow-hidden border shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPreviews((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="absolute top-2 right-2 bg-destructive/90 text-destructive-foreground rounded-full p-1.5 shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {previews.length < 5 && (
                <label className="w-[140px] h-[180px] shrink-0 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50">
                  <Plus className="w-6 h-6 text-muted-foreground mb-2" />
                  <span className="text-xs font-semibold uppercase">
                    Adicionar
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          ) : (
            <InputImageFile
              label="Imagens (Máx 5)"
              name="file"
              id="file"
              multiple
              onChange={handleFileChange}
              messageError={errors?.imageUrls?.message}
            />
          )}
        </div>

        {/* === LAYOUT FLEXBOX (À PROVA DE BALAS) === */}
        <div className="w-full flex flex-col gap-6">
          {/* Ocupa 100% (Linha inteira) */}
          <div className="w-full">
            <InputLabel
              label="Nome"
              placeholder="Ex: PlayStation 5"
              id="name"
              messageError={errors?.name?.message}
              {...register("name")}
            />
          </div>

          {/* Ocupa 100% (Linha inteira) */}
          <div className="w-full">
            <SelectLabel
              label="Categoria"
              name="categoryUuid"
              control={control}
              data={categories.map((category) => ({
                label: category.name,
                value: category.uuid,
              }))}
              messageError={errors?.categoryUuid?.message}
            />
          </div>

          {/* Lado a lado no Desktop (50% / 50%) - Um embaixo do outro no Mobile */}
          <div className="w-full flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
              <InputLabel
                label="Marca"
                placeholder="Ex: Sony"
                id="brand"
                messageError={errors?.brand?.message}
                {...register("brand")}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <InputLabel
                label="Modelo"
                placeholder="Ex: DualSense"
                id="model"
                messageError={errors?.model?.message}
                {...register("model")}
              />
            </div>
          </div>

          {/* Lado a lado no Desktop (50% / 50%) */}
          <div className="w-full flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
              <SelectLabel
                label="Condição"
                name="condition"
                control={control}
                data={listConditionMock}
                messageError={errors?.condition?.message}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <InputLabel
                label="Valor (R$)"
                id="value"
                placeholder="Ex: 200,45"
                messageError={errors?.value?.message}
                {...register("value")}
              />
            </div>
          </div>

          {/* Lado a lado no Desktop (50% / 50%) */}
          <div className="w-full flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
              <InputLabel
                label="Estoque"
                id="quantity"
                type="number"
                min="1"
                messageError={errors?.quantity?.message}
                {...register("quantity", { valueAsNumber: true })}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <InputLabel
                label="GTIN (Opcional)"
                id="gtin"
                placeholder="ABC-123"
                messageError={errors?.gtin?.message}
                {...register("gtin")}
              />
            </div>
          </div>

          {/* Ocupa 100% (Linha inteira) */}
          <div className="w-full">
            <TextAreaLabel
              label="Descrição"
              id="description"
              placeholder="Digite sobre o produto..."
              messageError={errors?.description?.message}
              {...register("description")}
            />
          </div>
        </div>

        {/* === BOTÃO SUBMIT === */}
        <Button
          className="w-full h-12 mt-2"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publicando...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-5 w-5" /> Publicar Produto
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
