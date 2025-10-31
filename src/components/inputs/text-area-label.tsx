import { ErrorMessageForm } from "../forms/error-message-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type InputLabelProps = React.ComponentProps<"textarea"> & {
  label: string;
  messageError?: string;
};

export function TextAreaLabel({
  label,
  messageError,
  id,
  ...rest
}: InputLabelProps) {
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor={id}>{label}</Label>
        <Textarea className="w-full h-32" {...rest} />
      </div>
      {messageError && <ErrorMessageForm message={messageError} />}
    </>
  );
}
