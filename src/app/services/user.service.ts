import { HttpClient } from '@angular/common/http';
import { User } from './../models/User';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { BACKEND_URL } from './tokens.service';
import { AccountService } from './account.service';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(BACKEND_URL) private backendUrl: string,
    public jwtHelper : JwtHelperService,
    public http : HttpClient,
    private accountService: AccountService,
    private sidebarService: SidebarService,
    private router: Router) { 

  }

  logOut(){
    this.accountService.removeTokensFromLocalStorage();

    this.sidebarService.closeProfileWindow();

    if(this.router.url == '/your-day'){
      this.router.navigate(['']);
    }
    
    this.accountService.$loggedUser.next(new User(-1));
  }

  public getUserById(id : number) : Observable<User>{
    return this.http.get<User>(this.backendUrl + 'api/user/GetById?id=' + id);
  }

  public updateUser(user : User) : Observable<User>{
    return this.http.put<User>(this.backendUrl + 'api/user/Update', user);
  }
}
