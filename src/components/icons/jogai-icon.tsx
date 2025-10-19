import Link from "next/link";

export function JogaiIcon() {
  return (
    <Link href="/home">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 text-primary">
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4v-2h2v2h-2zm0-4V7h2v2h-2zM8 11H6V9h2v2zm0 4H6v-2h2v2zm8-4h-2V9h2v2zm0 4h-2v-2h2v2z"></path>
          </svg>
        </div>
        <div className="text-2xl font-bold">Jogaí</div>
      </div>
    </Link>
  );
}
