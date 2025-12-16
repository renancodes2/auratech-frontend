import { Product } from "@/types/products"
import { formatPrice } from "@/utils/format-price"
import Image from "next/image"
import Link from "next/link"
import { FaStar } from "react-icons/fa"


interface ProductsListProps {
  data: Product[]
}

export function ProductList({ data }: ProductsListProps) {

  if(!data) {
    return <div>Error</div>
  }
  return (
    <>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((item) => {
          return (
            <div className="max-w-md flex flex-col" key={item.id}>
              <div className="relative w-full h-100 bg-red-200 rounded-xl overflow-hidden text-yellow-500">
                <Image
                  src={item.images[0]}
                  alt="Product Display"
                  quality={100}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>

              <p className="pl-2 font-bold text-xl pt-2">{item.name}</p>

              <div className="flex items-center justify-between px-2 pt-2">
                <div className="flex items-center gap-1">
                  <FaStar size={20} color="#f7db15"/>
                  <p>(530)</p>
                </div>
                <div>
                  <p className="font-bold">
                    <span className="text-red-600">{formatPrice(item.price)}</span>
                  </p>
                </div>
              </div>
            
              <p className="text-[#97a0b7] pl-2 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam enim laborum maxime necessitatibus assumenda, expedita ipsa temporibus!
              </p>

              <div className="w-full flex items-center justify-between mt-4">
                <button 
                  className="w-1/2 bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] text-[#061226] shadow-[0_6px_18px_rgba(124,92,255,0.18)] py-2 cursor-pointer font-bold"
                >
                  Adicionar ao carrinho
                </button>
                <button 
                  className="w-1/2 py-2 cursor-pointer font-bold"
                >
                  <Link href={`/detail/${item.id}`}>
                    Ver detalhes
                  </Link>
                </button>
              </div>
              
            </div>
            )
          })}
        </div>
    </>
  )
}