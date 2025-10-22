import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import type { AuthContextType } from "../types/global";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(AuthService.getToken());

  useEffect(() => {
    if(token) AuthService.saveToken(token);
  }, [token])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth_token" && event.newValue === null) {
        setToken(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const fakeToken = btoa(`${email}:${password}`);
        setToken(fakeToken);
        AuthService.saveToken(fakeToken);
        resolve();
      },1000)
    })
  }

  const logout = () => {
    setToken(null);
    AuthService.clearToken();
  }

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }

  return context
}
