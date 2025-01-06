import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from './../../services/sidebar.service';
import { Component } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { AccountService } from '../../services/account.service';
import { UserToLoginDTO } from '../../models/UserToLoginDTO';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NutritionService } from '../../services/nutrition.service';
import { BehaviorSubject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' }),
        animate('0.3s ease-in'),
      ]),
      transition('* => void', [
        animate(
          '0.3s ease-out',
          style({ opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent {

  emailIsValid = true;
  emailError = '';
  isLoggingIn = false;

  passwordError = '';

  public $emailError : BehaviorSubject<string> = new BehaviorSubject<string>('');
  public $passwordError : BehaviorSubject<string> = new BehaviorSubject<string>('');

  loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
  });
  
  constructor(
    public sidebarService : SidebarService, 
    public helperService : HelperService,
    private accountService : AccountService,
    private userService : UserService,
    private nutritionService : NutritionService,
    private router : Router) {

  }

  ngOnInit(){
    this.loginForm.reset();

    this.loginForm.get('email').valueChanges.subscribe(() => {
      this.$emailError.next('');
    });

    this.loginForm.get('password').valueChanges.subscribe(() => {
      this.$passwordError.next('');
    });

    this.$passwordError.subscribe(res => {
      this.passwordError = res;
    })
  }

  closeLogin(){
    this.sidebarService.closeLoginWindow();
    this.helperService.undimBackground();
    this.$passwordError.next('');

    if(this.accountService.isFromAuth()){
      this.accountService.setIsFromAuth(false);
    }
  }

  login(loginFormValue){
    if(this.loginForm.valid){
      this.isLoggingIn = true;

      const userToLogin : UserToLoginDTO = {
        email : loginFormValue.email,
        password : loginFormValue.password
      }

      this.accountService.login(userToLogin).subscribe(res => {
        if(this.helperService.isResponseValid(res) && res.isAuthSuccessful){
          var userFromToken = this.accountService.decodeUserFromToken((<any>res).accessToken);
          this.isLoggingIn = false;
          this.accountService.storeTokensInLocalStorage(res);

          this.userService.getUserById(userFromToken.id).subscribe(res => {
            if(this.helperService.isResponseValid(res)){
              this.accountService.setUser(res)
              this.nutritionService.getDataForUser();
            }
          });

          this.sidebarService.closeLoginWindow();

          if(this.accountService.isFromAuth()){
            this.accountService.setIsFromAuth(false);
            this.router.navigate(['your-day']);
          }
        } else {
          this.isLoggingIn = false;
          if(res.type == "Password"){
            this.$passwordError.next(res.errorMessage);
          }
          if (res.type == "Email"){
            this.$emailError.next(res.errorMessage);
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  isEmailValid() {
    const control = this.loginForm.get('email');
    return !control.errors;
  }

  isPasswordValid() {
    const control = this.loginForm.get('password');
    return !control.errors;
  }

  openRegisterWindow(){
    this.sidebarService.closeLoginWindow();
    this.sidebarService.openRegisterWindow();
    this.$passwordError.next('');
  }
}
