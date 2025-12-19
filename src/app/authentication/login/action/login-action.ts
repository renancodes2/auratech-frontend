"use server";

import api from "@/utils/axios-instance";
import { LoginFormDataType } from "../login-schema";
import { cookies } from "next/headers";

interface LoginActionData {
  name: string;
  email: string;
  token: string;
}

export const loginAction = async (data: LoginFormDataType) => {

  try {
    if(!data) {
      return { 
        success: false,
        message: 'Incomplete login data. Please fill in all required fields'
      }
    }
    
    const response: LoginActionData = (await api.post('/auth', data)).data

    const token = response.token;

    if (token) {
      const expressTime = 60 * 60 * 24 * 30 * 1000;

      const cookiesStore = await cookies();

      cookiesStore.set('session', token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      });
      
      const { email, name } = response;

      return { success: true, user: {
        name,
        email
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