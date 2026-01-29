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
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"

export function RegisterContent() {
  const router = useRouter();
  const form = useFormRegister()
  const { revalidateUser } = useAuth();
  
  const handleRegister = async (form: RegisterFormDataType) => {
    console.log('form data: ', form)

    const response = await RegisterAction(form)

    console.log(response)

    if (!response || response.success === false) {
      toast.error(response?.message || 'Falha ao criar usuário. Tente novamente.');
      return;
    }
    await revalidateUser();
    toast.success('sucesso ao se registrar');
    router.push('/');

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
                  <FormMessage className="text-red-500" />
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
                  <FormMessage className="text-red-500" />
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
                    <Input {...field} type="password"/>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <p className="mt-2 text-sm text-center">
              Já possui uma conta?{' '}
              <a href="/authentication/login" className="text-blue-500 underline">
                Faça login aqui
              </a>
            </p>
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