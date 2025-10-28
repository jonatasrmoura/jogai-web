import { Plus } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { LandingNavigation } from "../../../components/navigations/landing-navigation";
import { GameCard } from "../../../components/cards/game-card";
import { games } from "./games";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const currentUrl = params.name as
    | "my-games"
    | "explore"
    | "my-deals"
    | "wishlist"
    | undefined;

  const defaultUrl = !currentUrl ? "my-games" : currentUrl;

  return (
    <main>
      <div className="flex flex-col justify-between items-center gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Welcome back, Jonatas</h1>
          <p className="text-neutral-500">
            Here`s what`s happening in your gaming world.
          </p>
        </div>

        <div>
          <Button>
            <Plus />
            Add new Game
          </Button>
        </div>
      </div>

      <div className="border-b border-neutral-300">
        <LandingNavigation defaultUrl={defaultUrl} />
      </div>

      {defaultUrl === "my-games" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
          {games.map((game, i) => (
            <GameCard
              key={i}
              imageUrl={game.imageUrl}
              title={game.title}
              platform={game.platform}
              status={game.status}
            />
          ))}
        </div>
      ) : defaultUrl === "explore" ? (
        <p>Explore</p>
      ) : defaultUrl === "my-deals" ? (
        <p>My Deals</p>
      ) : defaultUrl === "wishlist" ? (
        <p>Wishlist</p>
      ) : null}
    </main>
  );
}
