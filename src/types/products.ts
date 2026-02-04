export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: string;
  category: {
    name: string
  },
  imagesUrls: string[];
  createdAt: string;
  updateAt: string;
}
