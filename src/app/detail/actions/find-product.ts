import { Product } from "@/types/products";
import api from "@/utils/axios-instance"


export const findProduct = async (id: string): Promise<Product | null> => {
  try {
    return (await api.get(`/product/${id}`)).data;
  }catch(err) {
    console.log(err)
    return null;
  }
}