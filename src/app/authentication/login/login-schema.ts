"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";


const schema = z.object({
  email: z.string().min(1,'O campo é obrigatório'),
  password: z.string().min(1, 'O campo senha é obrigatório')
})

export type LoginFormDataType = z.infer<typeof schema>;

export const useFormLogin = () => {
  return useForm<LoginFormDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
}