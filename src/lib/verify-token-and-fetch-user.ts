"use server"

import api from "@/utils/axios-instance";
import { User } from "@/types/user";

export async function verifyTokenAndFetchUser(token: string): Promise<User | null> {
 
  if(!token) return null;

  try {
    const user = await api.get('/auth/me',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log('user fetched by token: ================================================================================================================== ', user);

    if(user) return user.data;

    return null;
    
  }catch(err) {
    console.log(err)
    return null;
  }
}