import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public loggedUser : BehaviorSubject<User> = new BehaviorSubject<User>(new User)

  constructor(private http : HttpClient) { }

  login(loginFormValue) : Observable<HttpEvent<any[]>>{
    return this.http.post<HttpEvent<any[]>>('https://localhost:7069/api/account/Login', loginFormValue);
  }

  register(registerFormValue) : Observable<HttpEvent<any[]>>{
    return this.http.post<HttpEvent<any[]>>('https://localhost:7069/api/account/Register', registerFormValue);
  }
}
