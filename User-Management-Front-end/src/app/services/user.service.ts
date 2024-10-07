import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../Model/user';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<Users | null>;
  public currentUser: Observable<Users | null>;
  private apiUrl = 'http://localhost:5110/api/User';  // Update with your actual API URL

  constructor(private http: HttpClient, private router: Router) {
    // Initialize current user from local storage if available
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Users | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  RegisterUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${user.id}`, user);
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  setUser(user: Users) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data in local storage
  }

  clearUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser'); // Clear user data from local storage
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<Users>(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        console.error('Login error', error);
        return [null]; // Return null observable in case of error
      })
    );
  }

  logout() {
    // Clear user data and redirect to login page
    this.clearUser();
    this.router.navigate(['/login']);
  }
}
