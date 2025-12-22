"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RegisterFormDataType, useFormRegister } from "../register-schema"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { RegisterAction } from "../action/action"


export function RegisterContent() {
  const router = useRouter();
  const form = useFormRegister()
  
  const handleRegister = async (form: RegisterFormDataType) => {
    const response = await RegisterAction(form)

    if(!response || !response.success) {
      throw Error(response.message || 'Failed to create user')
    }

    router.push('/authenticarion/login')
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="max-w-4xl shadow-md shadow-white p-10">
        <h2 className="font-bold mb-10 text-center text-2xl">Criar Conta</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Nome: </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email: </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha: </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button 
              type="submit" 
              className="w-full bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] h-12 mt-3 rounded-md cursor-pointer"
            >Enviar
            </button>
          </form>
        </Form>
      </div>
    </main>
  )
}