import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'auth';

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  login(): void {
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  register(): void {
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }
}
