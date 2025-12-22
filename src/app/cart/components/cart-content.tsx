import Image from "next/image";
import Avatar from '@/assets/sonic.png';
import { FiTrash } from "react-icons/fi";

export function CartContent() {
  return (
    <div className="flex items-center justify-center flex-col lg:flex-row gap-7 mt-4">
      <section className="flex max-w-lg w-full bg-zinc-900 shadow-[0_4px_20px_rgba(255,255,255,0.05)] border border-zinc-800 p-2 rounded-lg"> 
        <div className="relative h-30 w-40">
          <Image
            src={Avatar}
            alt="Product Display"
            quality={100}
            fill
            className="object-cover rounded-lg bg-black"
            priority        
          />
        </div>
        <div className="w-full px-2 mt-2">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Product Name</h2>
            <FiTrash size={20} color="#ff4d4d" className="cursor-pointer"/>
          </div>
        </div>
      </section>
      <section 
        className="bg-zinc-900 shadow-[0_4px_20px_rgba(255,255,255,0.05)] border border-zinc-800 p-4 rounded-lg max-w-lg w-full flex flex-col justify-between"
      >
        <div className="font-(family-name:--font-saira)">
          <h2 className="text-2xl font-bold">Resumo dos Produtos</h2>
          <div className="font-medium mt-10 flex items-center justify-between">
            <p>SubTotal dos Produtos:</p> 
            <p>R$ 1.285.00</p>
          </div>
          <div className="font-medium mt-2 flex items-center justify-between">
            <p>Taxa de Entrega:</p> 
            <p>R$ 20.00</p>
          </div>
        </div>

        <div className="h-[1] bg-[#ddd] my-2"></div>

        <div className="flex items-center justify-between font-medium mt-3 font-(family-name:--font-saira)">
          <p>Total:</p>
          <p>R$ 1.305.00</p>
        </div>
      
        <button 
          className="bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] text-[#061226] w-full py-2 rounded-lg mt-4 font-bold font-(family-name:--font-saira)"
        >
          Finalizar Compra
        </button>
      </section>
    </div>
  )
}