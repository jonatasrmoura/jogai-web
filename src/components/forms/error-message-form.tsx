import { AlertCircle } from "lucide-react";

export function ErrorMessageForm({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-1.5 text-destructive mt-0.5">
      <AlertCircle className="w-3.5 h-3.5" />
      <p className="text-xs font-medium">{message}</p>
    </div>
  );
}
