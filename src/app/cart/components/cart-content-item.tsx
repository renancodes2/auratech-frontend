"use client"

import { CartItemData, useCart } from "@/context/cart-context";
import { formatPrice } from "@/utils/format-price";
import { truncate } from "@/utils/truncate";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

interface CartContentItemProps {
  data: CartItemData;
}

export function CartContentItem({ data }: CartContentItemProps) {

  const { addToCart, decrementItem, removeItem } = useCart();

  return (
    <div className="w-full flex justify-center rounded-lg">
      <div className="relative h-30 w-40">
        <Image
          src={data.image}
          alt="Product Display"
          quality={100}
          fill
          className="object-cover rounded-lg bg-black"
          priority
        />
      </div>
      <div className="w-full px-2 mt-2 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium font-(family-name:--font-saira)">{data.name}</h2>
          <button
            onClick={() => removeItem(data.id)}
          >
            <FiTrash size={20} color="#ff4d4d" className="cursor-pointer"/>
          </button>
        </div>
        <p className="text-sm text-[#97a0b7]">{truncate(data.description, 120)}</p>

        <div className="bottom-0 flex items-center justify-between">
          <p className="text-sm font-(family-name:--font-saira)">
            <span className="text-sm text-cyan-500">{formatPrice(data.price)}</span>
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => addToCart(data)}
              className="bg-cyan-600 h-5 w-5 rounded-md flex items-center justify-center cursor-pointer"
            >
              <FaPlus size={10} />
            </button>
            <span>{data.quantity}</span>
            <button 
              onClick={() => decrementItem(data.id)}
              className="bg-red-500 h-5 w-5 rounded-md flex items-center justify-center cursor-pointer"
            >
              <FaMinus size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}