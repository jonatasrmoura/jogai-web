import { ImagePlus } from "lucide-react";
import { Label } from "../../components/ui/label";

type InputImageFileProps = React.ComponentProps<"input"> & {
  label: string;
};

export function InputImageFile({ label, id, ...rest }: InputImageFileProps) {
  return (
    <div className="flex flex-col h-80 w-full  items-center gap-3">
      <Label className="self-start cursor-pointer" htmlFor={id}>
        {label}
      </Label>
      <Label
        className="grid items-center gap-3 border-dashed border-2 border-gray-600 h-80 w-full cursor-pointer"
        htmlFor={id}
      >
        <div className="flex flex-col justify-center items-center gap-2 text-gray-600">
          <ImagePlus />
          <p>Click to upload</p>
        </div>
        <input className="hidden" id={id} type="file" {...rest} />
      </Label>
    </div>
  );
}
