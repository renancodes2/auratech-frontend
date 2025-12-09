"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormLogin } from "../login-schema";
import { LoginFormDataType } from "../login-schema";
import { loginAction } from "../action/login-action";

export function LoginContent() {
  
  const form = useFormLogin();

  const handleLogin = async (data: LoginFormDataType) => {
    const response = await loginAction(data)
    if(!response) {
      console.log("error ")
    }

    console.log("SUCCESSSS", response)
    return response;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
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
                <FormLabel></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit">Enviar</button>
        </form>
      </Form>
    </div>
  )
}