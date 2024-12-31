import { HttpClient, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/User';
import { HelperService } from './helper.service';
import { BACKEND_URL } from './tokens.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _isFromAuth = false;
  public $loggedUser : BehaviorSubject<User> = new BehaviorSubject<User>(new User);

  constructor(
    @Inject(BACKEND_URL) private backendUrl: string,
    private http : HttpClient,
    private helperService : HelperService,
    private jwtHelper: JwtHelperService
  ) { 
    
  }

  setIsFromAuth(value: boolean){
    this._isFromAuth = value;
  }

  isFromAuth(){
    return this._isFromAuth;
  }

  login(loginFormValue) : Observable<any>{
    return this.http.post<HttpEvent<any[]>>(this.backendUrl + 'api/account/Login', loginFormValue);
  }

  register(registerFormValue) : Observable<any>{
    return this.http.post<HttpEvent<any[]>>(this.backendUrl + 'api/account/Register', registerFormValue);
  }

  refreshAccessToken(refreshToken){
    return this.http.post<HttpEvent<any[]>>(this.backendUrl + 'api/account/Refresh', {
      refreshToken: refreshToken,
    }).pipe(
      map((res: any) => {
        if(this.helperService.isResponseValid(res)){
          this.storeAccessTokenInLocalStorage(res.accessToken);
          return of(true);
        }
        return of(false);
      }),
      catchError(() => {
        return of(false);
      })
    )
  }

  storeTokensInLocalStorage(tokens: any){
    if(tokens){
      localStorage.setItem('accessTokenTihomirsWorkshop', tokens.accessToken);
      localStorage.setItem('refreshTokenTihomirsWorkshop', tokens.refreshToken);
    }
  }

  storeAccessTokenInLocalStorage(accessToken){
    if(accessToken){
      localStorage.setItem('accessTokenTihomirsWorkshop', (accessToken).accessToken);
    }
  }

  setUser(user){
    this.$loggedUser.next(user);
  }

  getAccessTokenFromLocalStorage(){
    return this.getTokensFromLocalStorage()?.accessToken;
  }

  getRefreshTokenFromLocalStorage(){
    return this.getTokensFromLocalStorage()?.refreshToken;
  }

  removeTokensFromLocalStorage(){
    localStorage.removeItem('accessTokenTihomirsWorkshop');
    localStorage.removeItem('refreshTokenTihomirsWorkshop');
  }

  getTokensFromLocalStorage(){
    if(typeof window !== 'undefined' && localStorage){
      let accessToken = localStorage.getItem('accessTokenTihomirsWorkshop');
      let refreshToken = localStorage.getItem('refreshTokenTihomirsWorkshop');

      if(accessToken && refreshToken){
        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      }
    }
    return null;
  }

  isTokenValid(accessToken: any) {
    if(!accessToken && accessToken == "undefined"){
      return false;
    }
    
    try{
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      
      return payload && payload.exp > now;
    } catch(e){
      return false;
    }
  }

  isUserLoggedIn(){
    let accessToken = this.getAccessTokenFromLocalStorage();

    if(!accessToken){
      return false;
    }

    let user = this.decodeUserFromToken(accessToken);
    return user.id && user.id != -1;
  }

  public decodeUserFromToken(accessToken : string){
    let tokenPayload = this.jwtHelper.decodeToken(accessToken);

    let user : User = {
      id: tokenPayload.Id,
      email: tokenPayload.Email,
      userName: tokenPayload.UserName,
      imageUrl: tokenPayload.ImageUrl,
      firstName: tokenPayload.FirstName,
      lastName: tokenPayload.LastName,
    }

    return user;
  } 

}

export interface RefreshRequest{
  refreshToken : string,
}
