export interface AuthCointextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
}
