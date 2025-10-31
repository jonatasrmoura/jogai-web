import Image from "next/image";
import { ImagePlus } from "lucide-react";

import { Label } from "../../components/ui/label";
import { ErrorMessageForm } from "../forms/error-message-form";

type InputImageFileProps = React.ComponentProps<"input"> & {
  label: string;
  preview?: string;
  messageError?: string;
};

export function InputImageFile({
  label,
  preview,
  id,
  messageError,
  ...rest
}: InputImageFileProps) {
  return (
    <>
      <div className="flex flex-col h-80 w-full  items-center gap-3">
        <Label className="self-start cursor-pointer" htmlFor={id}>
          {label}
        </Label>
        <Label
          className={`grid items-center gap-3 rounded-2xl ${
            !preview && "border-dashed border-2 border-gray-600"
          } h-80 w-full cursor-pointer`}
          htmlFor={id}
        >
          {!preview ? (
            <>
              <div className="flex flex-col justify-center items-center gap-2 text-gray-600">
                <ImagePlus />
                <p>Click to upload</p>
              </div>
            </>
          ) : (
            <Image
              className="flex flex-col object-cover w-full h-[300px] rounded-2xl"
              src={preview}
              alt="Preview"
              height={300}
              width={300}
            />
          )}
          <input
            className="hidden"
            id={id}
            type="file"
            accept="image/*"
            {...rest}
          />
        </Label>
      </div>

      {messageError && <ErrorMessageForm message={messageError} />}
    </>
  );
}
