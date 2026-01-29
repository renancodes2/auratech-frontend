"use server";

import api from "@/utils/axios-instance";
import { LoginFormDataType } from "../login-schema";
import { setSessionCookie } from "@/lib/auth";

interface LoginActionData {
  name: string
  token: string;
}

interface LoginActionResponse {
  success: boolean;
  user?: { 
    name: string;
    token: string;
  };
  message?: string;
}

export const loginAction = async (data: LoginFormDataType): Promise<LoginActionResponse> => {
  try {
    if(!data) {
      return { 
        success: false,
        message: 'Incomplete login data. Please fill in all required fields'
      }
    }
    
    const response: LoginActionData = (await api.post('/auth/login', data)).data

    const token = response.token

    if (token) {

      await setSessionCookie(token);
      
      const { name } = response;

      return { success: true, user: {
        name,
        token
      }};
    }

    return {
      success: false,
      message: 'Token not received from server.'
    }
  }catch(err){
    console.log(err)
    return {
      success: false,
      message: 'Authentication failed. Could not generate token'
    }
  }
}