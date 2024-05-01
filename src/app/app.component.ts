import { AccountService } from './services/account.service';
import { Component, ViewChild } from '@angular/core';
import { FooterService } from './services/footer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HelperService } from './services/helper.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger(
      'dimBackground', [
        state(
          'dim',
          style({
            opacity: 0.5,
          })
        ),
        state(
          'undim',
          style({
            opacity: 1,
          })
        ),
        transition('dim <=> undim', animate('200ms ease-in-out')),
      ],
    )
  ]
})
export class AppComponent {

  title = 'TihomirsWorkshop';

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService, 
    public router : Router,
    public accountService : AccountService,
    public userService : UserService
    ){

  }

  ngOnInit(){
    var accessToken = localStorage.getItem('accessToken')

    if(accessToken){
      var userFromToken = this.userService.decodeUserFromToken(accessToken);

      this.userService.getUserById(userFromToken.id).subscribe(res => {
          this.accountService.loggedUser.next(res);
      });
    } 
    else {
      this.accountService.loggedUser.next(new User(-1))
    }
  }

  undim(){
    // this.footerService.isPlusClicked.next(false);
    this.helperService.windowChoice.next('add');
    this.router.navigate([''])
  }
}