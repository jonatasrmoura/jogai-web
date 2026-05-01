"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputImageFile } from "../../../components/inputs/input-image-file";
import { InputLabel } from "../../../components/inputs/input-label";
import { SelectLabel } from "../../../components/selects/select-label";
import { Button } from "../../../components/ui/button";
import { MultiSelectLabel } from "../../selects/multi-select-label";
import { TextAreaLabel } from "../../inputs/text-area-label";

import { newGameSchema } from "./new-game-schema";
import { listPlatformsMock } from "../../../utils/mocks/list-platforms-mock";
import { listConditionMock } from "../../../utils/mocks/list-condition-mock";
import { createGameService } from "../../../services/games/create-game.service";
import { errorMessage } from "../../../lib/messages/error-message";
import { successMessage } from "../../../lib/messages/success-message";
import type { GetGenreDTO } from "../../../types/genres/get-genre.dto";

type NewGameFormData = z.infer<typeof newGameSchema>;

interface NewGameFormProps {
  listGenres: GetGenreDTO[];
}

export function NewGameForm({ listGenres }: NewGameFormProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewGameFormData>({
    resolver: zodResolver(newGameSchema),
  });

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

    setValue("files", selectedFiles);
  }

  async function onSubmit(data: NewGameFormData) {
    const formData = new FormData();

    const value = (Number(data.price.replace(/\D/g, "")) / 100).toFixed(2);

    formData.append("name", data.name);
    formData.append("platform", data.platform);
    formData.append("condition", data.condition);
    formData.append("description", data.description);
    formData.append("value", value);
    formData.append("isDigital", "false");
    formData.append("genresUuid", JSON.stringify(data.genresUuid));

    if (data.files) {
      Array.from(data.files).forEach((file) => {
        formData.append("file", file);
      });
    }

    const createGame = await createGameService(formData);

    if (!createGame) {
      return errorMessage(
        "Erro ao cadastrar o jogo",
        "Verifique os dados do jogo e tente novamente.",
      );
    }

    await successMessage(
      "Jogo cadastrado",
      "Seu anúncio foi criado com sucesso!",
    );

    reset();
    setPreviews([]);
  }

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Novo Anúncio
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Preencha os dados abaixo para anunciar seu jogo na vitrine.
        </p>
      </div>

      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Upload da imagem */}
        <div className="w-full space-y-4">
          {previews.length > 0 ? (
            <div
              className="
                w-full flex flex-row gap-4 
                overflow-x-auto pb-4 pt-2
                scrollbar-thumb-border scrollbar-track-transparent scrollbar-thin
                pr-4
              "
            >
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative w-[140px] h-[180px] sm:w-[180px] sm:h-[240px] shrink-0 rounded-xl overflow-hidden border border-border shadow-sm group"
                >
                  <Image
                    src={src}
                    alt={`Preview da imagem ${index + 1} do jogo`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    height={500}
                    width={500}
                  />
                  <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    type="button"
                    aria-label={`Remover imagem ${index + 1}`}
                    onClick={() => {
                      setPreviews((prev) => prev.filter((_, i) => i !== index));
                    }}
                    className="absolute top-2 right-2 bg-destructive/90 hover:bg-destructive text-destructive-foreground rounded-full p-1.5 shadow-md backdrop-blur-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {previews.length < 5 && (
                <label
                  className="w-[140px] h-[180px] sm:w-[180px] sm:h-[240px] shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all group"
                  aria-label="Adicionar mais imagens"
                >
                  <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors mb-2">
                    <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider group-hover:text-primary transition-colors">
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
              label="Imagens do Jogo (Máx 5)"
              name="file"
              id="file"
              multiple
              onChange={handleFileChange}
              messageError={errors?.files?.message}
            />
          )}
        </div>

        {/* Grid para agrupar campos menores em telas maiores */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="w-full md:col-span-2">
            <InputLabel
              label="Nome do Jogo"
              placeholder="Ex: God of War Ragnarök"
              id="name"
              messageError={errors?.name?.message}
              {...register("name")}
            />
          </div>

          {/* Plataforma */}
          <div className="w-full">
            <SelectLabel
              label="Plataforma"
              name="platform"
              control={control}
              data={listPlatformsMock}
              messageError={errors?.platform?.message}
            />
          </div>

          {/* Condição */}
          <div className="w-full">
            <SelectLabel
              label="Condição do Jogo"
              name="condition"
              control={control}
              data={listConditionMock}
              messageError={errors?.condition?.message}
            />
          </div>

          {/* Gênero */}
          <div className="w-full md:col-span-2">
            <MultiSelectLabel
              label="Gêneros"
              name="genresUuid"
              control={control}
              data={listGenres.map((genre) => ({
                label: genre.name,
                value: genre.uuid,
              }))}
              messageError={errors?.genresUuid?.message}
            />
          </div>

          {/* Preço */}
          <div className="w-full md:col-span-2">
            <InputLabel
              label="Valor de Venda (R$)"
              id="price"
              placeholder="Ex: 149,90"
              messageError={errors?.price?.message}
              {...register("price")}
            />
          </div>
        </div>

        {/* Descrição */}
        <div className="w-full">
          <TextAreaLabel
            label="Descrição Detalhada"
            id="description"
            placeholder="Descreva o estado do jogo, se possui manuais, códigos extras não resgatados, arranhões na mídia..."
            messageError={errors?.description?.message}
            {...register("description")}
          />
        </div>

        <Button
          className="w-full h-12 text-base font-semibold shadow-md"
          type="submit"
          aria-label={
            isSubmitting
              ? "Salvando anúncio do jogo"
              : "Publicar anúncio do jogo"
          }
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Publicando anúncio...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-5 w-5" />
              Publicar Jogo
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
