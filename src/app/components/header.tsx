"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from 'react-icons/fa'
import { useState } from "react"

export function Header() {

  const [showModal, setShowModal] = useState(false)


  return (
    <>
    <Sheet open={showModal} onOpenChange={setShowModal}>
      <div className="w-full flex items-center justify-between px-10 h-12 border-b-2 border-[#ddd]">
        <div>
          <h2 className="font-bold text-2xl">AURA <span className="text-red-500">TECH</span></h2>
        </div>
        <div>
          <h2> 
            <SheetTrigger className="cursor-pointer md:hidden">
              <FaBars size={24} color="#fff" />
            </SheetTrigger>
          </h2>
        </div>
      </div>
     
      <SheetContent className="z-99">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    </>
  )
}