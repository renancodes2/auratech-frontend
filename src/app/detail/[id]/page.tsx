import { Product } from "@/types/products";
import { findProduct } from "../actions/find-product";
import Image from "next/image";


export default async function ProductDetail({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;

  const product: Product | null = await findProduct(id)

  if(!product) {
    return <div>Produto não encontrado...</div>
  }

  return (
    <main>
      <div className="max-w-3xl">
        <div className="relative w-full h-100 bg-red-200 rounded-xl overflow-hidden text-yellow-500">
          <Image 
            src={product.images[0]}
            alt="Product Display"
            quality={100}
            fill
            className="object-cover rounded-lg"
            priority        
          />
        </div>
      </div>
      <div>

      </div>
    </main>
  )
}