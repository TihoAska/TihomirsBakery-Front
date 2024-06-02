import { AccountService } from './services/account.service';
import { Component, ViewChild } from '@angular/core';
import { FooterService } from './services/footer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HelperService } from './services/helper.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/User';
import { NutritionService } from './services/nutrition.service';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'TihomirsWorkshop';

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService, 
    public router : Router,
    public accountService : AccountService,
    public userService : UserService,
    public nutritionService : NutritionService,
    public jwtHelper : JwtHelperService,
    ){

  }

  ngOnInit(){
    var accessToken = localStorage.getItem('accessToken');
    let tokenPayload = this.jwtHelper.decodeToken(accessToken);

    if(accessToken){
      var userFromToken = this.userService.decodeUserFromToken(accessToken);

      this.userService.getUserById(userFromToken.id).subscribe(res => {
          this.accountService.$loggedUser.next(res);
          this.nutritionService.getDataForUser();
      });

      setInterval(() => {
        this.accountService.checkAccessToken();
      }, (new Date(tokenPayload.exp * 1000).getTime()) - (new Date()).getTime());

      console.log("New token in: ");
      console.log((new Date(tokenPayload.exp * 1000).getTime()) - (new Date()).getTime());
    } 
    else {
      this.accountService.$loggedUser.next(new User(-1))
    }
  }

  toggleSidebar(){
    this.footerService.isHamburgerClicked.next(!this.footerService.isHamburgerClicked.value);
  }

  undim(){
    this.router.navigate([''])
  }
}