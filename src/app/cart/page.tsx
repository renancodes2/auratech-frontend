"use server"

import { getCookieServer } from "@/lib/cookie-server";
import { verifyTokenAndFetchUser } from "@/lib/verify-token-and-fetch-user";
import { redirect } from "next/navigation";


export default async function Cart() {

  const token = await getCookieServer()

  if(!token) redirect('/')

  const user = await verifyTokenAndFetchUser(token)

  if(!user) redirect('/');

  return (
    <div>
      <h2>Helllo</h2>
    </div>
  )
}