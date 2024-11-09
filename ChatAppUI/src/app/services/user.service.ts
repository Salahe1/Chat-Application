import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7094/api/User'; // replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
}
}