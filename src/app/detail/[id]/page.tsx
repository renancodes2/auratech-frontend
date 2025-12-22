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
    <main className="mt-10">
      <div className="max-w-3xl m-auto">
        <div className="relative max-w-3xl h-90 md:h-100 lg:150 bg-red-200 rounded-xl overflow-hidden text-yellow-500">
          <Image 
            src={product.images[0]}
            alt="Product Display"
            quality={100}
            fill
            className="object-contain rounded-lg bg-black"
            priority        
          />
        </div>
      </div>
      <div>
        <h2 className="text-center text-2xl mt-5">{product.name}</h2>
        <p className="text-[#97a0b7] pl-2 mt-3 max-w-2xl text-justify m-auto">
          {product.description}
        </p>
      </div>
    </main>
  )
}