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

  checkAccessToken(){
    const token = localStorage.getItem('accessToken');

    if(this.jwtHelper.isTokenExpired(token)){
      const refreshToken = localStorage.getItem('refreshToken');

      const refreshRequest : RefreshRequest = {
        refreshToken: refreshToken,
      }

      if(refreshToken != null){
        this.http.post<HttpEvent<any[]>>('https://localhost:7069/api/account/Refresh', refreshRequest).subscribe(res => {
          localStorage.setItem('accessToken', (<any>res).accessToken);
        });
      }
      else
      {
        this.$isFromAuth.next(true);
        this.helperService.dimBackground.next(true);
        this.sidebarService.toggleLogin.next(true);

        return false;
      }
    } 

    return true;
  }
}

export interface RefreshRequest{
  refreshToken : string,
}
