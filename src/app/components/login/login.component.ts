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
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.3s ease-in'),
      ]),
      transition('* => void', [
        animate(
          '0.3s ease-out',
          style({ opacity: 0, transform: 'scale(0.5)' })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent {

  emailIsValid = true;
  emailError = '';

  passwordIsValid = true;

  public $emailError : BehaviorSubject<string> = new BehaviorSubject<string>('');
  public $passwordError : BehaviorSubject<string> = new BehaviorSubject<string>('');

  loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
  });
  
  constructor(
    public sidebarService : SidebarService, 
    private helperService : HelperService,
    private accountService : AccountService,
    private userService : UserService,
    private nutritionService : NutritionService,
    private router : Router) {
      this.loginForm.valueChanges.subscribe(() => {
        this.updateErrorMessages();
      });
  }

  ngOnInit(){
    this.loginForm.reset();

    this.loginForm.get('email').valueChanges.subscribe(() => {
      this.$emailError.next('');
    });

    this.loginForm.get('password').valueChanges.subscribe(() => {
      this.$passwordError.next('');
    });
  }

  closeLogin(){
    this.sidebarService.toggleLogin.next(false);
    this.helperService.dimBackground.next(false);
    this.$passwordError.next('');

    if(this.accountService.$isFromAuth.value){
      this.accountService.$isFromAuth.next(false);
    }
  }

  login(loginFormValue){
    if(this.loginForm.valid){
      const userToLogin : UserToLoginDTO = {
        email : loginFormValue.email,
        password : loginFormValue.password
      } 
      this.accountService.login(userToLogin).subscribe(res => {
        if(res != null && res.isAuthSuccessful){
          var userFromToken = this.userService.decodeUserFromToken((<any>res).accessToken);
          localStorage.setItem('accessToken', (<any>res).accessToken);
          localStorage.setItem('refreshToken', (<any>res).refreshToken);

          this.userService.getUserById(userFromToken.id).subscribe(res => {
            this.accountService.$loggedUser.next(res);
            this.nutritionService.getDataForUser();
          });

          this.sidebarService.toggleLogin.next(false);
          this.helperService.dimBackground.next(false);

          if(this.accountService.$isFromAuth.value){
            this.accountService.$isFromAuth.next(false);
            this.router.navigate(['your-day']);
          }
        } else {
          // this.passwordError = res.errorMessage;
          if(res.type == "Password"){
            this.$passwordError.next(res.errorMessage);
          }
          if (res.type == "Email"){
            this.$emailError.next(res.errorMessage);
          }
        }
      });
    }
  }

  updateErrorMessages() {
    this.emailIsValid = this.isEmailValid();
    this.passwordIsValid = this.isPasswordValid();
  }

  isEmailValid() {
    const control = this.loginForm.get('email');
    return !control.errors;
  }

  isPasswordValid() {
    const control = this.loginForm.get('password');
    return !control.errors;
  }

  toggleRegisterWindow(){
    this.sidebarService.toggleLogin.next(false);
    this.helperService.toggleRegisterWindow.next(true);
    this.$passwordError.next('');
  }
}
