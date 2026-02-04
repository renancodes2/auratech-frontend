import { Product } from "@/types/products";
import { findProduct } from "../actions/find-product";
import { ProductContent } from "../components/product-content";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;

  const product: Product | null = await findProduct(id)

  if(!product) {
    return <div>Produto não encontrado...</div>
  }


  return (
    <ProductContent product={product} />
  )
}