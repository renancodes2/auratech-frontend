"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  FaBars,  
  FaBolt, 
  FaChevronCircleDown, 
  FaShoppingBag, 
  FaUser 
} from 'react-icons/fa'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Avatar from "@/assets/sonic.png"
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from "@/context/cart-context";

export function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/authentication/login' || pathname === '/authentication/register';
  const [showModal, setShowModal] = useState(false);
  const { user, handleLogout } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { quantityInCart } = useCart()

  useEffect(() => {
      function setValues() {
        setIsClient(true);
        setQuantity(quantityInCart());
    }
    
    setValues();
  }, [quantityInCart]);

  if(isAuthPage) {
    return null;
  }

  if (!isClient) {
    return null;
  }


  return (
    <>
    <Sheet open={showModal} onOpenChange={setShowModal}>
      <div className="w-full flex items-center justify-between px-10 h-12 border-b-2 border-transparent [border-image:linear-gradient(90deg,#7c5cff,#4dd0e1)_1]">
        <div>
          <h2>
          <Link href="/" className="flex items-center gap-1">
            <FaBolt 
              size={24} 
              className="text-[#00d4ff] drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] animate-pulse" 
            />
            
            <span className="
              text-3xl font-bold
              bg-linear-to-r from-[#00d4ff] via-[#ff006e] to-[#00d4ff] 
              bg-size-[200%_auto]
              font-(family-name:--font-saira-stencil)
              animate-shine 
              bg-clip-text text-transparent"
            >
              AURA TECH
            </span>
          </Link>
          </h2>
        </div>
        <div>
          <SheetTrigger className="cursor-pointer md:hidden">
            <FaBars size={24} color="#fff" />
          </SheetTrigger>
          <div className="hidden md:flex gap-3">
            <div className="relative">
              <Link href={`/cart`}>
                <FaShoppingBag size={24} color="#ddd" />
              </Link>

              {quantity > 0 && (
                <p
                  className="w-4 h-4 bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] text-[#061226] shadow-[0_6px_18px_rgba(124,92,255,0.18)] rounded-full flex items-center justify-center text-[10px] absolute left-3 top-4"
                >
                  {quantity}
                </p>
              )}
            </div>
            <div className="cursor-pointer relative">
              <Popover>
                {!user ? (
                  <PopoverTrigger asChild>
                    <FaUser size={24} color="#ddd" />
                  </PopoverTrigger>
                ): (
                  <PopoverTrigger asChild>
                    <div>
                      <Image 
                        src={Avatar}
                        alt="Avatar"
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    </div>
                  </PopoverTrigger>
                )}

                {user ? (
                  <PopoverContent className="bg-black">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                    >
                      <FiLogOut size={20} color="#ddd" />
                      Sair da conta
                    </button>
                  </PopoverContent>
                ): (
                  <PopoverContent className="bg-black">
                    <Link 
                      href={`/authentication/login`} 
                      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                    >
                      <FiLogOut size={20} color="#ddd" />
                      Fazer Login
                    </Link>
                  </PopoverContent>
                )}

              </Popover>

              <p className="absolute left-4 top-4">
                <FaChevronCircleDown size={15} color="#4dd0e1" />
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
            {!user ? (
              <Link 
                href="/authentication/login"
                className="flex items-center gap-2"
              >
                <FaUser size={24} color="#ddd" />
                <p>Login</p>
              </Link>
            ): (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 font-medium"
              >
                <Image 
                  src={Avatar}
                  alt="Avatar"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <p>Sair da conta</p>
              </button>
            )}
          </div>
          <Link 
            href="/cart"
            className="flex items-center pl-3 gap-2"
          >
            <FaShoppingBag size={24} color="#ddd" />
            <p>Carrinho</p>
          </Link>
      </SheetContent>
    </Sheet>
    </>
  )
}