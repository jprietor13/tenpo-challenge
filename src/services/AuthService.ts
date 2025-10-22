export class AuthService {
  private static TOKEN_KEY = 'auth_token';

  static saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
