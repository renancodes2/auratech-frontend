import api from "@/utils/axios-instance";
import { RegisterFormDataType } from "../register-schema";


export async function RegisterAction(body: RegisterFormDataType) {
  
  try {
    const res = await api.post('/users', body)
    
    return res
  }catch(err) {
    console.log(err)
    throw new Error('Failed to create user')
  }

}