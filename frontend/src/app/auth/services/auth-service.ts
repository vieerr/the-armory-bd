import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/clients/me';

  constructor(private http: HttpClient) {} 

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User>(this.apiUrl, { withCredentials: true }).pipe(
      catchError((err) => {
        console.error('Failed to get current user:', err);
        return of(null);
      })
    );
  }

  getUserId(user: User | null): number | null {
    return user?.id ?? null;
  }

  getEmail(user: User | null): string {
    return user?.email ?? '';
  }

  getRole(user: User | null): string {
    return user?.role ?? '';
  }
}
