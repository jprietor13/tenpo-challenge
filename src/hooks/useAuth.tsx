import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { isAuthenticated, token, login, logout } = useAuthContext();
  return { isAuthenticated, token, login, logout }
}
