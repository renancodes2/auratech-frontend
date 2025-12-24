"use client"

import { useCart } from "@/context/cart-context"
import { CartContentItem } from "./cart-content-item";
import { formatPrice } from "@/utils/format-price";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartContent() {

  const { cart, calculateSubtotal, calculateTotalWithTax } = useCart();

  return (
    <div className="flex justify-center flex-col lg:flex-row gap-7 mt-4 mx-auto">
        <section className="flex flex-col max-w-lg w-full bg-zinc-900 shadow-[0_4px_20px_rgba(255,255,255,0.05)] border border-zinc-800 p-2 rounded-lg gap-4">
          <ScrollArea className="h-[500px] w-full pr-4">
            <div className="flex flex-col gap-1">
              {cart.map((item) => (
                <CartContentItem key={item.id} data={item} />
              ))}
            </div>
          </ScrollArea>
        </section>
      <section 
        className="bg-zinc-900 shadow-[0_4px_20px_rgba(255,255,255,0.05)] border border-zinc-800 p-4 rounded-lg max-w-lg w-full flex flex-col justify-between"
      >
        <h2 className="text-2xl font-bold">Resumo dos Produtos</h2>
        <div className="">
          <div className="font-(family-name:--font-saira)">
            <div className="font-medium mt-10 flex items-center justify-between">
              <p>SubTotal dos Produtos:</p>
              <p>{formatPrice(calculateSubtotal())}</p>
            </div>
            <div className="font-medium mt-2 flex items-center justify-between">
              <p>Taxa de Entrega:</p>
              <p>R$ 20.00</p>
            </div>
          </div>
          <div className="h-[1] bg-[#ddd] my-2"></div>
          <div className="flex items-center justify-between font-medium mt-3 font-(family-name:--font-saira)">
            <p>Total: {formatPrice(calculateTotalWithTax(20))}</p>
            <p></p>
          </div>
          <button
            className="bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] text-[#061226] w-full py-2 rounded-lg mt-4 font-bold font-(family-name:--font-saira)"
          >
            Finalizar Compra
          </button>
        </div>
      </section>
    </div>
  )
}