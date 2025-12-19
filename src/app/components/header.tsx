"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars, FaShoppingBag, FaUser } from 'react-icons/fa'
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {

  const pathname = usePathname();
  const isAuthPage = pathname === '/authentication/login' || pathname === '/authentication/register';

  const [showModal, setShowModal] = useState(false)

  if(isAuthPage) {
    return null;
  }

  return (
    <>
    <Sheet open={showModal} onOpenChange={setShowModal}>
      <div className="w-full flex items-center justify-between px-10 h-12 border-b-2 border-[#ddd]">
        <div>
          <h2 className="font-bold text-2xl">AURA <span className="text-red-500">TECH</span></h2>
        </div>
        <div>
          <SheetTrigger className="cursor-pointer md:hidden">
            <FaBars size={24} color="#fff" />
          </SheetTrigger>
          <div className="hidden md:flex">
            <div className="relative">
              <FaShoppingBag size={24} color="#ddd" />

              <p 
                className="w-4 h-4 bg bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] text-[#061226] shadow-[0_6px_18px_rgba(124,92,255,0.18)] rounded-full flex items-center justify-center text-[10px] absolute left-3 top-4"
              >
                1
              </p>
            </div>
          </div>
        </div>
      </div>
     
      <SheetContent className="bg-black">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
          <div className="flex items-center pl-3 gap-2">
            <FaUser size={24} color="#ddd" />
            <p>Perfil</p>
          </div>
          <div className="flex items-center pl-3 gap-2">
            <FaShoppingBag size={24} color="#ddd" />
            <p>Carrinho</p>
          </div>
      </SheetContent>
    </Sheet>
    </>
  )
}