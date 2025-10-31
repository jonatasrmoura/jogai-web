"use client";
import { useState } from "react";
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

type NewGameFormData = z.infer<typeof newGameSchema>;

export function NewGameForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    const file = event.target.files?.[0];
    if (!file) return;

    setValue("image", file); // ✅ registra o arquivo no form

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function onSubmit(data: NewGameFormData) {
    console.log(data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // const response = await axios.post(
      //   "https://sua-api.com/games/create",
      //   formData,
      //   { headers: { "Content-Type": "multipart/form-data" } }
      // );

      alert("Jogo cadastrado com sucesso!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar o jogo");
    }
  }

  return (
    <form
      className="max-w-md flex flex-col items-center gap-4 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Upload da imagem */}
      <div className="w-full mb-2">
        <InputImageFile
          label="Game Cover Image"
          id="file"
          onChange={handleFileChange}
          preview={imagePreview ?? undefined}
          messageError={!imagePreview ? errors?.image?.message : undefined}
        />
      </div>

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
