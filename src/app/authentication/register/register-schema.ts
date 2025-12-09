"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
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