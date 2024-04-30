import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public jwtHelper : JwtHelperService) { }


  public decodeUserFromToken(accessToken : string){
    let tokenPayload = this.jwtHelper.decodeToken(accessToken);

    let user : User = {
      id: tokenPayload.Id,
      email: tokenPayload.Email,
      userName: tokenPayload.UserName,
      imageURL: tokenPayload.ImageUrl,
    }

    return user;
  } 
}
