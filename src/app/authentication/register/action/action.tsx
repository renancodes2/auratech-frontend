import api from "@/utils/axios-instance";
import { RegisterFormDataType } from "../register-schema";


export async function RegisterAction(body: RegisterFormDataType) {
  const res = await api.post('/users', body)

  return res
}