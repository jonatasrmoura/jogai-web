"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputImageFile } from "../../../components/inputs/input-image-file";
import { InputLabel } from "../../../components/inputs/input-label";
import { SelectLabel } from "../../../components/selects/select-label";
import { Button } from "../../../components/ui/button";
import { TextAreaLabel } from "../../inputs/text-area-label";

import { newGameSchema } from "./new-game-schema";
import { listPlatformsMock } from "../../../app/(private)/new-game/mocks/list-platforms-mock";
import { listGenreMock } from "../../../app/(private)/new-game/mocks/list-genre-mock";
import { listConditionMock } from "../../../app/(private)/new-game/mocks/list-condition-mock";
import { createGameService } from "../../../services/games/create-game.service";

type NewGameFormData = z.infer<typeof newGameSchema>;

export function NewGameForm() {
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
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
    setValue("images", selectedFiles);
  }

  async function onSubmit(data: NewGameFormData) {
    const formData = new FormData();

    // 1. Campos Simples (Importante: 'value' e 'isDigital' como o backend espera)
    formData.append("name", data.name);
    formData.append("platform", data.platform);
    formData.append("condition", data.condition);
    formData.append("description", data.description);
    formData.append("value", data.price.replace(/\D/g, "")); // Limpa R$ para enviar só número
    formData.append("isDigital", "false"); // Ou adicione um checkbox no form

    // 2. Gêneros (Seu backend espera 'genresUuid' como array JSON)
    formData.append("genresUuid", JSON.stringify([data.genre]));

    // 3. Imagens (O backend faz loop em parts, o fieldname aqui pode ser 'files')
    Array.from(data.images).forEach((file) => {
      formData.append("files", file);
    });

    try {
      // Use sua instância da API (axios ou fetch)
      await createGameService(formData);

      alert("Jogo cadastrado com sucesso!");
      reset();
      setPreviews([]);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar o jogo");
    }
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
                  fill
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
            name="images"
            id="file"
            multiple
            onChange={handleFileChange}
            messageError={errors?.images?.message}
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

      {/* Gênero */}
      <div className="w-full">
        <SelectLabel
          label="Genre"
          name="genre"
          control={control}
          data={listGenreMock}
          messageError={errors?.genre?.message}
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

      <Button className="w-full" type="submit">
        <Plus />
        Salvar jogo
      </Button>
    </form>
  );
}
