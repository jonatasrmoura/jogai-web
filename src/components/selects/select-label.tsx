import { Control, Controller } from "react-hook-form";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel as LabelSelect,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ErrorMessageForm } from "../forms/error-message-form";

interface SelectLabelProps {
  label: string;
  name: string; // ← Importante para o RHF
  control: Control<any>; // aceita qualquer formulário
  data: {
    value: string;
    label: string;
  }[];
  messageError?: string;
}

export function SelectLabel({
  label,
  name,
  data,
  control,
  messageError,
}: SelectLabelProps) {
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>{label}</Label>

        <Controller
          name={name}
          control={control}
          defaultValue="" // ✅ evita undefined
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Selecione ${label}`} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <LabelSelect>{label}</LabelSelect>

                  {data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {messageError && <ErrorMessageForm message={messageError} />}
    </>
  );
}
