declare global {
  interface MyProductDeal {
    title: string;
    platform: string;
    imageUrl: string;
    status: string;
    description: string;
    price?: number;
    buyerName: string;
  }
}

export {};
