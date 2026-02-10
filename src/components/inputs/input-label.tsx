import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessageForm } from "../forms/error-message-form";

type InputLabelProps = React.ComponentProps<"input"> & {
  label: string;
  messageError?: string;
};

export function InputLabel({
  label,
  id,
  messageError,
  ...rest
}: InputLabelProps) {
  return (
    <>
      <div className="grid w-full max-w-md items-center gap-3">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...rest} />
      </div>
      {messageError && <ErrorMessageForm message={messageError} />}
    </>
  );
}
