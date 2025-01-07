import { AccountService } from './services/account.service';
import { Component } from '@angular/core';
import { FooterService } from './services/footer.service';
import { HelperService } from './services/helper.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/User';
import { NutritionService } from './services/nutrition.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'TihomirsWorkshop';
  loadingTexts = ['loading...', 'baking bread...', 'kneading dough...', 'oven on fire...', 'house burning down...'];

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService, 
    public router : Router,
    public accountService : AccountService,
    public userService : UserService,
    public nutritionService : NutritionService,
    public jwtHelper : JwtHelperService,
    public loadingService: LoadingService
    ){

  }

  ngOnInit(){
    this.loadingService.showLoadingOverlay(this.loadingTexts);
    var accessToken = localStorage.getItem('accessTokenTihomirsWorkshop');

    if(accessToken){
      var userFromToken = this.accountService.decodeUserFromToken(accessToken);

      this.userService.getUserById(userFromToken.id).subscribe(res => {
        this.loadingService.hideLoadingOverlay();
        this.accountService.$loggedUser.next(res);
        this.nutritionService.getDataForUser();
      });
    } 
    else {
      this.accountService.$loggedUser.next(new User(-1));
      this.loadingService.hideLoadingOverlay();
    }
  }

  toggleSidebar(){
    this.footerService.setIsHamburgerClicked(!this.footerService.isHamburgerClicked());
  }

  undim(){
    this.router.navigate(['']);
  }
}