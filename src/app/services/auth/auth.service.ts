import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}

interface RegisterResponse {
  id: string;
  email: string;
  phone: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY: string = 'auth';
  private readonly API_URL: string = 'https://ppsapi.onrender.com/api';
  private readonly TOKEN_KEY: string = 'token';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
        localStorage.setItem(this.AUTH_KEY, 'true');
      })
    );
  }

  register(name: string, email: string, phone: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/auth/register`, {
      name,
      email,
      phone,
      password
    }).pipe(
      tap(() => {
        localStorage.setItem(this.AUTH_KEY, 'true');
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
