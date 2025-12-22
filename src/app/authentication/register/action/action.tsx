import api from "@/utils/axios-instance";
import { RegisterFormDataType } from "../register-schema";


export async function RegisterAction(body: RegisterFormDataType) {
  
  try {

    const register =await api.post('/users', body)

    if(register) {
      return {
        success: true,
        message: 'User created successfully'
      }
    }else {
      return {
        success: false,
        message: 'Failed to create user'
      }
    }
  }catch(err) {
    console.log(err)
    return {
      success: false,
      message: 'Failed to create user'
    }
  }

}