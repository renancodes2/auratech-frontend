import { Product } from "@/types/products";
import api from "@/utils/axios-instance";
import { ProductsList } from "./components/products-list";

export const revalidate = 120;

const findAllProducts = async (): Promise<Product[]> => { 
  try {
    
    return (await api.get('/products')).data 

  }catch(err) {
    console.log('error searching for products', err);
    return [];
  }
}

export default async function Home() {
  const products: Product[] = await findAllProducts()

  if(!products) {
    return <div>Produtos não encontrados...</div>
  }

  return (
    <div className="w-full h-screen p-10">
      <ProductsList data={products}/>
    </div>
  );
}
