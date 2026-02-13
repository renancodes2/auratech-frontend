"use client"

import { Product } from "@/types/products";
import { formatPrice } from "@/utils/format-price";
import { truncate } from "@/utils/truncate";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ProductComments } from "./ProductComments";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

interface ProductContentProps {
  product: Product;
}

export function ProductContent({ product }: ProductContentProps) {

  const [selectedImage, setSelectedImage] = useState(product.imagesUrls[0]);
  const [descriptionLimit, setDescriptionLimit] = useState(200);
  const { addToCart } = useCart();

  function handleAddToCart(product: Product) {
    addToCart({
      id: product.id,
      image: product.imagesUrls[0],
      name: product.name,
      price: product.price,
      description: product.description,
    })

    toast.success('Produto adicionado ao carrinho');
  }


  return (
    <main className="flex flex-col max-w-7xl mx-auto">
      <section className="flex flex-col xl:flex-row xl:mt-10">
        <div className="xl:max-w-[800px] w-full flex flex-col">
            <div className="relative rounded-xl h-[500px] overflow-hidden text-yellow-500">
              <Image
                src={selectedImage}
                alt="images"
                quality={100}
                fill
                className="object-contain xl:object-cover rounded-lg"
                priority
              />

              <div className="absolute bottom-3 right-1/2 flex items-center gap-2">
                
                {product.imagesUrls.map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(imageUrl)}
                    className={`${imageUrl === selectedImage ? 'ring-2 ring-offset-2 ring-cyan-400' : ''} rounded-full cursor-pointer`}
                  >
                    <Image
                      src={imageUrl}
                      alt="thumbnail"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden xl:flex">
              <ProductComments />
            </div>

        </div>
        <div className="w-full xl:max-w-lg flex flex-col justify-between mx-auto max-h-[530px]">
          <div>
            <h2 
              className="text-3xl text-center xl:text-start font-medium font-(family-name:--font-title)"
              >
                {product?.name.toUpperCase()}
            </h2>
            <p className="text-[#97a0b7] pl-2 max-w-2xl text-justify mt-5 mx-auto font-(family-name:--font-body)">
                {truncate(product.description, descriptionLimit)} 
                <button onClick={() => setDescriptionLimit(v => v + 80)} className="cursor-pointer">
                  {descriptionLimit < product.description.length ? '...ver mais' : ''}
                </button>
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between px-2 my-4 font-(family-name:--font-saira)">
              <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-md">
                <p>
                  {product?.category.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="bg-gray-800 p-1 rounded-md">
                  <span>
                    STOCK: {product?.stock}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between px-2 my-4">
              <div className="flex items-center gap-1 font-(family-name:--font-saira)">
                <FaStar size={20} color="#f7db15"/>
                <p>4.8 (530)</p>
              </div>
              <div>
                <p className="font-bold">
                  <span className="text-cyan-400 font-(family-name:--font-saira)">
                    {formatPrice(product?.price)}
                  </span>
                </p>
              </div>
            </div>
            <button
              className="w-full bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] text-[#061226] shadow-[0_6px_18px_rgba(124,92,255,0.18)] py-3 cursor-pointer font-bold rounded-md"
              onClick={() => handleAddToCart(product)}
            >
            Adicionar ao carrinho
            </button>
          </div>
        </div>
      </section>


      <section className="xl:hidden">
        <ProductComments />
      </section>
    </main>
  )
}