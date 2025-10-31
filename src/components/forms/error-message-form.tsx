export function ErrorMessageForm({ message }: { message: string }) {
  return <p className="text-red-500 font-semibold mt-1">{message}</p>;
}
