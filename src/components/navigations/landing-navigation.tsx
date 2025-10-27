import Link from "next/link";

interface LandingNavigationProps {
  defaultUrl: "my-games" | "explore" | "my-deals" | "wishlist";
}

export function LandingNavigation({ defaultUrl }: LandingNavigationProps) {
  return (
    <nav className="max-w-md flex justify-start items-center text-center">
      <Link
        href={{
          pathname: "/dashboard",
          query: { name: "my-games" },
        }}
        className={`w-full font-semibold py-3 ${
          defaultUrl === "my-games"
            ? "text-primary border-b-2 border-primary"
            : "text-neutral-500 border-b border-primary/30 transition-all hover:opacity-85"
        }`}
      >
        My Games
      </Link>
      <Link
        href={{
          pathname: "/dashboard",
          query: { name: "explore" },
        }}
        className={`w-full font-semibold py-3 ${
          defaultUrl === "explore"
            ? "text-primary border-b-2 border-primary"
            : "text-neutral-500 border-b border-primary/30 transition-all hover:opacity-85"
        }`}
      >
        Explore
      </Link>
      <Link
        href={{
          pathname: "/dashboard",
          query: { name: "my-deals" },
        }}
        className={`w-full font-semibold py-3 ${
          defaultUrl === "my-deals"
            ? "text-primary border-b-2 border-primary"
            : "text-neutral-500 border-b border-primary/30 transition-all hover:opacity-85"
        }`}
      >
        My Deals
      </Link>
      <Link
        href={{
          pathname: "/dashboard",
          query: { name: "wishlist" },
        }}
        className={`w-full font-semibold py-3 ${
          defaultUrl === "wishlist"
            ? "text-primary border-b-2 border-primary"
            : "text-neutral-500 border-b border-primary/30 transition-all hover:opacity-85"
        }`}
      >
        My Wishlist
      </Link>
    </nav>
  );
}
