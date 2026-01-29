"use server"

import api from "@/utils/axios-instance";
import { RegisterFormDataType } from "../register-schema";
import { setSessionCookie } from "@/lib/auth";

interface RegisterActionResponse {
  success: boolean;
  data?: {
    name: string;
    token: string;
  };
  message?: string;
}

export async function RegisterAction(data: RegisterFormDataType): Promise<RegisterActionResponse> {

  try {
    
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      roles: [
        "USER"
      ]
    }

    const request = await api.post('/auth/register', payload);

    console.log(request)

    const response = request.data as { name: string; token: string; };

    console.log(response)

    if (response && response.token) {
      await setSessionCookie(response.token);
      return {
        success: true,
        data: {
          name: response.name,
          token: response.token
        },
        message: 'User created successfully'
      };
    }

    return {
      message: 'Failed to create user',
      success: false
    }

  }catch(err) {
    console.log(err)
    return {
      success: false,
      message: 'Failed to create user'
    }
  }

}