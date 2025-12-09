"use server";

import api from "@/utils/axiosInstance";
import { LoginFormDataType } from "../login-schema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface LoginActionData {
  name: string;
  email: string;
  token: string;
}

export const loginAction = async (data: LoginFormDataType) => {

  try {
    if(!data) {
      throw new NextResponse('Incomplete login data. Please fill in all required fields')
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

    return null;
  }catch(err){
    throw new NextResponse('Authentication failed. Could not generate token')
  }
}