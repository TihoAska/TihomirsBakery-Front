import { ApexDataLabels } from 'ng-apexcharts';
import { Component } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from '../../services/sidebar.service';
import { UserToRegisterDTO } from '../../models/UserToRegisterDTO';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { FooterService } from '../../services/footer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  emailIsValid = true;
  emailError = '';

  passwordIsValid = true;
  passwordError = '';

  registerForm = new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    userName : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', Validators.required),
    confirmPassword : new FormControl('', Validators.required),
    imageUrl : new FormControl(this.sidebarService.pickedAvatar.value),
  })

  constructor(
    public helperService : HelperService,
    public sidebarService : SidebarService,
    public accountService : AccountService,
    public userService : UserService,
    public footerService : FooterService) {
      this.registerForm.valueChanges.subscribe(() => {
        this.updateErrorMessages();
      });
  }

  register(registerFormValue){
    if(this.registerForm.valid){
      const userToRegister : UserToRegisterDTO = {
        firstName : registerFormValue.firstName,
        lastName : registerFormValue.lastName,
        userName : registerFormValue.userName,
        email : registerFormValue.email,
        password : registerFormValue.password,
        confirmPassword : registerFormValue.confirmPassword,
        imageUrl: this.sidebarService.pickedAvatar.value.icon
      } 
      this.accountService.register(userToRegister).subscribe(res => {
        if(res != null){
          var user = this.userService.decodeUserFromToken((<any>res).accessToken);
          localStorage.setItem('accessToken', (<any>res).accessToken);
          localStorage.setItem('refreshToken', (<any>res).refreshToken);
  
          this.helperService.toggleRegisterWindow.next(false);
          this.helperService.dimBackground.next(false);
  
          this.accountService.loggedUser.next(user)
        }
      })
    }
  }

  closeRegister(){
    this.helperService.dimBackground.next(false);
    this.helperService.toggleRegisterWindow.next(false);
  }

  toggleLoginWindow(){
    this.helperService.toggleRegisterWindow.next(false);
    this.sidebarService.toggleLogin.next(true);
  }

  updateErrorMessages() {
    this.emailIsValid = this.isEmailValid();
    this.passwordIsValid = this.isPasswordValid();
  }

  isEmailValid() {
    const control = this.registerForm.get('email');
    return !control.errors;
  }

  isPasswordValid() {
    const control = this.registerForm.get('password');
    return !control.errors;
  }

  toggleAvatarPicker(){
    this.helperService.toggleRegisterWindow.next(false);
    this.sidebarService.toggleAvatarPickerWindow.next(true);
  }
}
