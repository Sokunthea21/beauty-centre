export interface Product {
  id: string;
  _id: string;
  title: string;
  description: string;
  price: number;
  offerPrice?: number;
  vendor: string;
  category?: string;
  mainImage: string;
  images?: string[];
  usage?: string;
  skinType?: string;
  ingredients?: string;
}
