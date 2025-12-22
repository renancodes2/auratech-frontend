"use server"

import api from "@/utils/axios-instance";
import { User } from "@/types/user";

export async function verifyTokenAndFetchUser(token: string): Promise<User | null> {
  try {
    const user = await api.get('/auth/session',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if(user) return user.data;

    return null;
    
  }catch(err) {
    console.log(err)
    return null;
  }
}