import { createContext, useState, ReactNode, useContext } from "react";
import type { AuthCointextType } from "../types/global";

const AuthContext = createContext<AuthCointextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const fakeToken = btoa(`${email}:${password}`);
        setToken(fakeToken);
        resolve();
      },1000)
    })
  }

  const logout = () => {
    setToken(null);
  }

  const value: AuthCointextType = {
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
