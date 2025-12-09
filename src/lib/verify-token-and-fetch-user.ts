"use server"

import api from "@/utils/axios-instance";

export async function verifyTokenAndFetchUser(token: string): Promise<boolean> {
  try {

    const user = await api.get('/auth/session',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if(user) return true;

    return false;
    
  }catch(err) {
    console.log(err)
    return false;
  }
}