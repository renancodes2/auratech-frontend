"use server"

import { cookies } from "next/headers";

export async function setSessionCookie(token: string) {
  const expressTime = 60 * 60 * 24 * 30 * 1000;
  const cookiesStore = await cookies();

  cookiesStore.set('session', token, {
    maxAge: expressTime,
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
}