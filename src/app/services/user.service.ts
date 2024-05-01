import { HttpClient, HttpEvent } from '@angular/common/http';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public jwtHelper : JwtHelperService,
    public http : HttpClient) { }


  public decodeUserFromToken(accessToken : string){
    let tokenPayload = this.jwtHelper.decodeToken(accessToken);

    let user : User = {
      id: tokenPayload.Id,
      email: tokenPayload.Email,
      userName: tokenPayload.UserName,
      imageUrl: tokenPayload.ImageUrl,
    }

    return user;
  } 

  public getUserById(id : number) : Observable<User>{
    return this.http.get<User>('https://localhost:7069/api/user/GetById?id=' + id);
  }

  public updateUser(user : User) : Observable<User>{
    return this.http.put<User>('https://localhost:7069/api/user/Update', user);
  }
}
