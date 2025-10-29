declare global {
  interface MyGameDeal {
    title: string;
    platform: string;
    imageUrl: string;
    status: GameStatus;
    description: string;
    price?: number;
    buyerName: string;
  }
}

export {};
