import { AccountService } from './services/account.service';
import { Component } from '@angular/core';
import { FooterService } from './services/footer.service';
import { HelperService } from './services/helper.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/User';
import { NutritionService } from './services/nutrition.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'TihomirsWorkshop';
  textIntervalId;
  loadingTextIndex = 1;
  isLoadingOverlayDisplayed = true;
  loadingText = 'loading...'
  loadingTexts = ['loading...', 'baking bread...', 'kneading dough...', 'oven on fire...', 'house burning down...'];

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService, 
    public router : Router,
    public accountService : AccountService,
    public userService : UserService,
    public nutritionService : NutritionService,
    public jwtHelper : JwtHelperService,
    public sidebarService: SidebarService
    ){

  }

  ngOnInit(){
    this.showLoadingOverlay();

    var accessToken = localStorage.getItem('accessTokenTihomirsWorkshop');

    if(accessToken){
      var userFromToken = this.accountService.decodeUserFromToken(accessToken);

      this.userService.getUserById(userFromToken.id).subscribe(res => {
        this.accountService.$loggedUser.next(res);
        this.nutritionService.getDataForUser();
        this.sidebarService.$hasAvatarLoaded.subscribe(hasLoaded => {
          if(hasLoaded){
            this.hideLoadingOverlay();
          }
        })
      });
    } 
    else {
      this.accountService.$loggedUser.next(new User(-1));
      this.hideLoadingOverlay();
    }
  }

  toggleSidebar(){
    this.footerService.setIsHamburgerClicked(!this.footerService.isHamburgerClicked());
  }

  undim(){
    this.router.navigate(['']);
  }

  showLoadingOverlay(){
    this.isLoadingOverlayDisplayed = true;
    this.startLoadingTextRotation();
  }

  hideLoadingOverlay(){
    this.isLoadingOverlayDisplayed = false;
    this.stopLoadingTextRotation();
  }

  startLoadingTextRotation(){
    this.textIntervalId = setInterval(() => {
      this.changeLoadingText(this.loadingTexts[this.loadingTextIndex]);
      this.loadingTextIndex++;
      if(this.loadingTextIndex >= this.loadingTexts.length){
        this.loadingTextIndex = 0;
      }
    }, 5000);
  }

  changeLoadingText(loadingText){
    this.loadingText = loadingText;
  }

  stopLoadingTextRotation(){
    if(this.textIntervalId){
      this.loadingTextIndex = 0;
      clearInterval(this.textIntervalId);
      this.textIntervalId = null;
    }
  }
}