"use client"

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormLogin } from "../login-schema";
import { LoginFormDataType } from "../login-schema";
import { loginAction } from "../action/login-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

export function LoginContent() {
  const router = useRouter();
  const form = useFormLogin();
  const { revalidateUser } = useAuth();
  
  const handleLogin = async (data: LoginFormDataType) => {
    const response = await loginAction(data);
    if(!response || response.success === false) {
      toast.error('Error ao fazer login')
      throw new Error(response?.message || 'Authentication failed. Could not generate token');
    }

    await revalidateUser();
    toast.success('sucesso ao fazer login')
    router.push('/');
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="max-w-4xl shadow-md md:shadow-white p-10">
        <h2 className="font-bold mb-10 text-center text-2xl">
          Login
        </h2>

        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Email: </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-red"/>
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
                  <FormMessage className="text-red"/>
                </FormItem>
              )}
            />

            <p className="mt-2 text-sm">
              Ainda não possui uma conta?{' '}
              <a
                href="/authentication/register" 
                className="text-blue-500 underline"
              >
                Registre-se aqui
              </a>
            </p>

            <button 
              type="submit" 
              className="w-full bg-[linear-gradient(90deg,#7c5cff,#4dd0e1)] h-12 mt-3 rounded-md cursor-pointer"
            >
              fazer login
            </button>
          </form>
        </Form>
      </div>
    </main>
  )
}