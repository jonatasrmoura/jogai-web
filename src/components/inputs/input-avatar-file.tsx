import { Label } from "../../components/ui/label";
import { ErrorMessageForm } from "../forms/error-message-form";

type InputImageFileProps = React.ComponentProps<"input"> & {
  label: string;
  messageError?: string;
};

export function InputAvatarFile({
  label,
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
        <Label htmlFor={id}>
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
