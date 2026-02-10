"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowBigLeftDash, Loader2, Plus } from "lucide-react";

import { InputLabel } from "../../inputs/input-label";
import { TextAreaLabel } from "../../inputs/text-area-label";
import { NoAvatarProfile } from "../../no-avatar-profile";
import { AuthContext } from "../../../contexts/auth-context";
import { updateAvatarService } from "../../../services/user-auth/update-avatar.service";
import { errorMessage } from "../../../lib/messages/error-message";
import { successMessage } from "../../../lib/messages/success-message";
import { Button } from "../../ui/button";
import type { UpdateUserProfileDTO } from "../../../types/users/update-user-profile.dto";
import { updateUserProfileService } from "../../../services/user-auth/update-user-profile.service";

type UpdateProfileFormProps = UpdateUserProfileDTO & {
  avatarUrl?: string;
};

export function UpdateProfileForm({
  fullname,
  birthday,
  bio,
  avatarUrl,
}: UpdateProfileFormProps) {
  const { setUserIsUpdate } = useContext(AuthContext);
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdateUserProfileDTO>({
    defaultValues: {
      fullname: fullname,
      birthday: birthday,
      bio: bio,
    },
  });

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const fileSelected = selectedFiles[0];
    const newPreview = URL.createObjectURL(fileSelected);

    formData.append("file", fileSelected);

    setPreview(newPreview);

    const result = await updateAvatarService(formData);

    console.log(result);

    if (!result)
      return errorMessage(
        "Erro ao atualizado Avatar!",
        "Verifique seu arquivo de imagem e tente novamente.",
      );

    setUserIsUpdate(true);

    successMessage("Avatar atualizado com sucesso!", "");
  }

  async function onSubmit(data: UpdateProfileFormProps) {
    const result = await updateUserProfileService(data);

    if (!result)
      return errorMessage(
        "Erro ao atualizar perfil!",
        "Verifique os dados e tente novamente.",
      );

    reset();
    setUserIsUpdate(true);

    await successMessage("Perfil atualizado com sucesso!", "");
    router.push("/profile");
  }

  return (
    <main className="h-[75vh] flex flex-col gap-4 items-center">
      {/* Avatar com Borda */}
      <div className="relative group mb-5">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-125">
          {preview || avatarUrl ? (
            <label
              htmlFor="edit-avatar"
              className="w-full h-full cursor-pointer"
            >
              <Image
                src={preview || (avatarUrl as string)}
                alt={fullname}
                fill
                className="object-cover rounded-full"
              />
            </label>
          ) : (
            <label
              htmlFor="edit-avatar"
              className="text-7xl w-full h-full cursor-pointer"
            >
              <NoAvatarProfile userName={fullname} />
            </label>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          id="edit-avatar"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 justify-center items-center px-2"
      >
        <InputLabel
          label="Nome completo"
          type="text"
          placeholder="Digite seu nome completo"
          {...register("fullname")}
        />
        <InputLabel
          label="Data de nascimento"
          type="text"
          placeholder="Digite sua data de nascimento"
          {...register("birthday")}
        />
        <TextAreaLabel
          label="Biografia"
          placeholder="Digite sua biografia"
          {...register("bio")}
        />

        <div className="max-w-md w-full flex flex-col gap-4">
          <Button
            className="w-full"
            type="submit"
            disabled={isSubmitting} // Desativa o botão durante o envio
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1 animate-spin" />
                Salvando perfil...
              </>
            ) : (
              <>
                <Plus />
                Salvar
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="bg-neutral-200"
            onClick={() => router.push("/profile")}
          >
            <ArrowBigLeftDash />
            Voltar
          </Button>
        </div>
      </form>
    </main>
  );
}
