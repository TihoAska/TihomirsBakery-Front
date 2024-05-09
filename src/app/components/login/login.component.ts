import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from './../../services/sidebar.service';
import { Component } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { AccountService } from '../../services/account.service';
import { UserToLoginDTO } from '../../models/UserToLoginDTO';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  emailIsValid = true;
  emailError = '';

  passwordIsValid = true;
  passwordError = '';

  loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
  });
  
  constructor(
    public sidebarService : SidebarService, 
    private helperService : HelperService,
    private accountService : AccountService,
    private userService : UserService) {
      this.loginForm.valueChanges.subscribe(() => {
        this.updateErrorMessages();
      });
  }

  ngOnInit(){
    this.loginForm.reset();
  }

  closeLogin(){
    this.sidebarService.toggleLogin.next(false);
    this.helperService.dimBackground.next(false);
  }

  login(loginFormValue){
    if(this.loginForm.valid){
      const userToLogin : UserToLoginDTO = {
        email : loginFormValue.email,
        password : loginFormValue.password
      } 
      this.accountService.login(userToLogin).subscribe(res => {
        if(res != null){
          var userFromToken = this.userService.decodeUserFromToken((<any>res).accessToken);
          localStorage.setItem('accessToken', (<any>res).accessToken);
          localStorage.setItem('refreshToken', (<any>res).refreshToken);

          this.userService.getUserById(userFromToken.id).subscribe(res => {
            this.accountService.$loggedUser.next(res);
            this.nutritionService.getDataForUser();
          });
  
          this.sidebarService.toggleLogin.next(false);
          this.helperService.dimBackground.next(false);
        }
      })
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
  }
}
