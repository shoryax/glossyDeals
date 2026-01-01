export type Product = {
  id: string | number;
  name: string;
  price: number | null;
  imageUrl?: string | null;
  link?: string | null;
  store?: string | null;
  category?: string | null;
  scrapedAt?: string | Date | null;
  url?: string | null;
  discount?: number | null;
  original_price?: number | null;
};
