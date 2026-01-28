"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Loader2 } from "lucide-react";
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

    // 1. Validar limite de 5 imagens
    if (previews.length + filesArray.length > 5) {
      alert("Você pode enviar no máximo 5 imagens");
      return;
    }

    // 2. Criar novos previews
    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);

    // 3. Atualizar o valor no React Hook Form
    // Nota: Para o backend receber múltiplos 'files', precisamos converter para array
    setValue("files", selectedFiles);
  }

  async function onSubmit(data: NewGameFormData) {
    const formData = new FormData();

    const value = (Number(data.price.replace(/\D/g, "")) / 100).toFixed(2);

    formData.append("name", data.name);
    formData.append("platform", data.platform);
    formData.append("condition", data.condition);
    formData.append("description", data.description);
    formData.append("value", value); // Limpa R$ para enviar só número
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
      "Seu jogo foi cadastrado com sucesso",
    );

    reset();
    setPreviews([]);
  }

  useEffect(() => {
    // Cleanup: remove as URLs da memória quando o componente "morre"
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  return (
    <form
      className="max-w-md flex flex-col items-center gap-4 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Upload da imagem */}
      <div className="w-full mb-2 space-y-4">
        {/* CARROSSEL MANUAL DE PREVIEW 
         - Aparece apenas se houver imagens selecionadas
      */}
        {previews.length > 0 ? (
          <div
            className="
              w-full flex flex-row gap-3 
              overflow-x-auto pb-2 
            
              scrollbar-thumb-zinc-300 scrollbar-track-transparent scrollbar-thin
              pr-12
            "
          >
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] snap-center shrink-0 rounded-xl overflow-hidden border-2 border-zinc-200"
              >
                <Image
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                  height={500}
                  width={500}
                />
                <button
                  type="button"
                  onClick={() => {
                    // Lógica para remover uma imagem específica se desejar
                    setPreviews((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs w-6"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Botão de Adicionar Mais (se for menos de 5) */}
            {previews.length < 5 && (
              <label className="min-w-[120px] h-[150px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors">
                <Plus className="text-zinc-400" />
                <span className="text-[10px] text-zinc-400 font-bold uppercase">
                  Add
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
          /* Estado vazio: o seu InputImageFile original */
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

      {/* ============================================ */}

      {/* Nome */}
      <div className="w-full">
        <InputLabel
          label="Game Name"
          placeholder="Ex: God of War"
          id="name"
          messageError={errors?.name?.message}
          {...register("name")}
        />
      </div>

      {/* Plataforma */}
      <div className="w-full">
        <SelectLabel
          label="Platform"
          name="platform"
          control={control}
          data={listPlatformsMock}
          messageError={errors?.platform?.message}
        />
      </div>

      {/* Gênero - Agora usando MultiSelect */}
      <div className="w-full">
        <MultiSelectLabel
          label="Genres"
          name="genresUuid" // Nome deve bater com o seu Zod Schema
          control={control}
          data={listGenres.map((genre) => ({
            label: genre.name,
            value: genre.uuid,
          }))}
          messageError={errors?.genresUuid?.message}
        />
      </div>

      {/* Condição */}
      <div className="w-full">
        <SelectLabel
          label="Condition"
          name="condition"
          control={control}
          data={listConditionMock}
          messageError={errors?.condition?.message}
        />
      </div>

      {/* Preço */}
      <div className="w-full">
        <InputLabel
          label="Game Value"
          id="price"
          placeholder="R$ 99,90"
          messageError={errors?.price?.message}
          {...register("price")}
        />
      </div>

      {/* Descrição */}
      <div className="w-full">
        <TextAreaLabel
          label="Game Description"
          id="description"
          placeholder="Descreva o jogo, estado e conteúdo extra..."
          messageError={errors?.description?.message}
          {...register("description")}
        />
      </div>

      <Button
        className="w-full"
        type="submit"
        disabled={isSubmitting} // Desativa o botão durante o envio
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando jogo...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Salvar jogo
          </>
        )}
      </Button>
    </form>
  );
}
