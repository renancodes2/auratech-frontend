"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { 
  FaBars,  
  FaBolt, 
  FaChevronCircleDown, 
  FaShoppingBag, 
  FaUser 
} from 'react-icons/fa'
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/context-auth";
import Image from "next/image";
import Avatar from "@/assets/sonic.png"
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

export function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/authentication/login' || pathname === '/authentication/register';
  const [showModal, setShowModal] = useState(false)

  const { user, handleLogout } = useAuth();

  if(isAuthPage) {
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

              <p 
                className="w-4 h-4 bg bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] text-[#061226] shadow-[0_6px_18px_rgba(124,92,255,0.18)] rounded-full flex items-center justify-center text-[10px] absolute left-3 top-4"
              >
                1
              </p>
            </div>
            <div className="cursor-pointer relative">
              <HoverCard>
                {!user ? (
                  <HoverCardTrigger asChild>
                    <FaUser size={24} color="#ddd" />
                  </HoverCardTrigger> 
                ): (
                  <HoverCardTrigger asChild>
                    <div>
                      <Image 
                        src={Avatar}
                        alt="Avatar"
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    </div>
                  </HoverCardTrigger>
                )}

                {user ? (
                  <HoverCardContent className="bg-black">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                    >
                      <FiLogOut size={20} color="#ddd" />
                      Sair da conta
                    </button>
                  </HoverCardContent>
                ): (
                  <HoverCardContent className="bg-black">
                    <Link 
                      href={`/authentication/login`} 
                      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                    >
                      <FiLogOut size={20} color="#ddd" />
                      Fazer Login
                    </Link>
                  </HoverCardContent>
                )}

              </HoverCard>

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
              <>
                <FaUser size={24} color="#ddd" />
                <p>Perfil</p>
              </>
            ): (
              <>
                <Image 
                  src={Avatar}
                  alt="Avatar"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <p>Perfil</p>
              </>
            )}
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