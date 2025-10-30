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

type SelectLabelProps = {
  label: string;
  data: Array<{
    value: string;
    label: string;
  }>;
};

export function SelectLabel({ label, data }: SelectLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label>{label}</Label>
      <Select>
        <SelectTrigger className="md:max-w-[190px] w-full">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <LabelSelect>{label}</LabelSelect>

            {!!data.length &&
              data.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
