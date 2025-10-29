declare global {
  type GameType = "Sell" | "Trade" | "Lend";

  interface GameExplore {
    title: string;
    city: string;
    state: string;
    price?: string;
    image: string;
    type: GameType;
    isFavorite: boolean;
    platform: string;
  }
}

export {};
