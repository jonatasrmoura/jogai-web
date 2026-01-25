"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounce evita que a cada letra digitada o banco seja consultado.
  // Ele espera 300ms após o usuário parar de digitar.
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    // Atualiza a URL sem recarregar a página: /marketplace?name=explore&search=mario
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      className="m-5 lg:w-[25%]"
      type="search"
      placeholder="Search by name..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("search")?.toString()}
    />
  );
}
