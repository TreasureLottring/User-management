import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = '';
  constructor(private http: HttpClient) {}

  RegisterUser(user: any): Observable<Users> {
    return this.http.post<Users>(this.URL, user);
  }
}
