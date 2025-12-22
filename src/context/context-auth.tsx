"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { deleteCookieClient, getCookieClient } from "@/lib/cookie-client";
import { verifyTokenAndFetchUser } from "@/lib/verify-token-and-fetch-user";
import { User } from "@/types/user";

interface AuthContextData {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = await getCookieClient();
        if (token) {
          const userData = await verifyTokenAndFetchUser(token as string);
          setUser(userData);
        }
      } catch (err) {
        console.error("Erro ao carregar usuário", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

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
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);