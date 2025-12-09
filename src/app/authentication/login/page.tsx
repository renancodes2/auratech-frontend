import { getCookieServer } from "@/lib/cookie-server";
import { LoginContent } from "./components/login-content";

export default async function Login() {
  const token = await getCookieServer();

  if(!token) return
  console.log(token)

  return <LoginContent />
}