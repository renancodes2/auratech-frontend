"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  email: z.string().min(1, 'O campo email é obrigatório').email('Formato de email inválido'),
  password: z.string().min(5, 'A senha deve ter no mínimo 5 caracteres')
})

export type RegisterFormDataType = z.infer<typeof formSchema>;

export const useFormRegister = () => {
  return useForm<RegisterFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })
}