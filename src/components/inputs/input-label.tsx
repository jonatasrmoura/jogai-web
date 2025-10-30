import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputLabelProps = React.ComponentProps<"input"> & {
  label: string;
};

export function InputLabel({ label, id, ...rest }: InputLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input type="email" id={id} {...rest} />
    </div>
  );
}
