declare global {
  interface MyProduct {
    title: string;
    platform: string;
    imageUrl: string;
    status: string;
    description: string;
    price?: number;
  }
}

export {};
