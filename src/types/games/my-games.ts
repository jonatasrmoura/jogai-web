declare global {
  type GameStatus = "Sell" | "Trade" | "Lend";

  interface MyGame {
    title: string;
    platform: string;
    imageUrl: string;
    status: GameStatus;
    description: string;
    price?: number;
  }
}

export {};
