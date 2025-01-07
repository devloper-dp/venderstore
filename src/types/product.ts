export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
}