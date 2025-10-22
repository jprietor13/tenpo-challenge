export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface Item {
  id: number;
  title: string;
  body?: string;
} 
