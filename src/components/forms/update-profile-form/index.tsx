"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowBigLeftDash, Loader2, Save, UploadCloud } from "lucide-react";

import { InputLabel } from "../../inputs/input-label";
import { TextAreaLabel } from "../../inputs/text-area-label";
import { NoAvatarProfile } from "../../no-avatar-profile";
import { AuthContext } from "../../../contexts/auth-context";
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
  const { handleUpdateAvatar, setUserIsUpdate } = useContext(AuthContext);
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

    await handleUpdateAvatar(formData);
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
    <div className="w-full bg-card border border-border shadow-sm rounded-3xl p-6 md:p-10 flex flex-col gap-8 items-center">
      <div className="text-center space-y-1">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Editar Perfil
        </h2>
        <p className="text-muted-foreground text-sm">
          Atualize sua foto e detalhes para a comunidade te conhecer melhor.
        </p>
      </div>

      {/* Avatar Edit Área */}
      <div className="relative group flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-background bg-muted overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
          <label
            htmlFor="edit-avatar"
            className="w-full h-full cursor-pointer flex items-center justify-center relative z-10"
            aria-label="Alterar foto de perfil"
          >
            {preview || avatarUrl ? (
              <Image
                src={preview || (avatarUrl as string)}
                alt="Sua foto de perfil"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <div className="text-5xl w-full h-full flex items-center justify-center">
                <NoAvatarProfile userName={fullname} />
              </div>
            )}

            {/* Overlay Escuro com Ícone no Hover */}
            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-foreground backdrop-blur-sm">
              <UploadCloud className="w-8 h-8 mb-1" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Alterar
              </span>
            </div>
          </label>
        </div>

        <input
          type="file"
          className="hidden"
          id="edit-avatar"
          onChange={handleFileChange}
          accept="image/*"
          aria-hidden="true"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputLabel
            label="Nome completo"
            type="text"
            placeholder="Ex: João Silva"
            {...register("fullname")}
          />
          <InputLabel
            label="Data de nascimento"
            type="text"
            placeholder="DD/MM/AAAA"
            {...register("birthday")}
          />
        </div>

        <TextAreaLabel
          label="Biografia"
          placeholder="Fale um pouco sobre seus jogos favoritos, seu estilo de gameplay..."
          {...register("bio")}
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-1/3 h-12 bg-background/50 border-border hover:bg-muted font-semibold"
            onClick={() => router.push("/profile")}
            aria-label="Cancelar edição e voltar ao perfil"
          >
            <ArrowBigLeftDash className="mr-2 w-5 h-5" />
            Cancelar
          </Button>

          <Button
            className="w-full sm:w-2/3 h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
            type="submit"
            disabled={isSubmitting}
            aria-label={
              isSubmitting
                ? "Salvando informações do perfil"
                : "Salvar alterações do perfil"
            }
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Salvando perfil...
              </>
            ) : (
              <>
                <Save className="mr-2 w-5 h-5" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
