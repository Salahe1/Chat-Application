import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  claims: any;

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    // Check if localStorage is available
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null; // Return null if localStorage is not available
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true; // localStorage is available
    } catch (e) {
      return false; // localStorage is not available
    }
  }

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }


  // Call this method to authenticate and get a JWT
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post('https://localhost:7094/api/Auth/login', credentials).pipe(
      catchError(error => {
        // Handle the error appropriately here
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }


  // Store the token in localStorage
  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
      this.tokenSubject.next(token);
     // this.claims = parseJwt(token); // Store claims
    }
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isLocalStorageAvailable() && !!localStorage.getItem('token');
  }

  // Optionally provide a method to log out
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      this.tokenSubject.next(null);
    }
  }

   // New method to decode and log the token claims
   logTokenClaims(): void {
    const token = this.getToken();
    if (token) {

      const decodedToken = this.parseJwt(token);
      console.log('Decoded Token Claims:', decodedToken);
    } else {
      console.warn('No token found in local storage.');
    }
  }

  parseJwt(token: string) {
    if (!token || token.split('.').length < 3) {
        throw new Error('Invalid token format');
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);
}

}
