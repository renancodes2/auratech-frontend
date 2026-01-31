"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { deleteCookieClient, getCookieClient } from "@/lib/cookie-client";
import { verifyTokenAndFetchUser } from "@/lib/verify-token-and-fetch-user";
import { User } from "@/types/user";

interface AuthContextData {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  handleLogout: () => void;
  revalidateUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

const revalidateUser = useCallback(async () => {
    // console.log("================================================================1111111111")
    setLoading(true);
    try {
      const token = await getCookieClient();
      console.log(token)
      if (token) {
        const userData = await verifyTokenAndFetchUser(token as string);
        setUser(userData);

        // console.log("======================" + userData)
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Erro ao validar usuário", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    revalidateUser();
  }, [revalidateUser]);

  function handleLogout() {
    deleteCookieClient();
    setUser(null);
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        isAuthenticated: !!user, 
        handleLogout, 
        revalidateUser
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);