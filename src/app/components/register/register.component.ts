import { Component } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from '../../services/sidebar.service';
import { UserToRegisterDTO } from '../../models/UserToRegisterDTO';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { FooterService } from '../../services/footer.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('fadeInOut', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translate(-50%, -50%) scale(1)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.5)',
        }),
        animate('0.3s ease-in'),
      ]),
      transition('* => void', [
        animate(
          '0.3s ease-out',
          style({
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.5)',
          })
        ),
      ]),
    ]),
  ]
})
export class RegisterComponent {

  showTakenEmailError = false;
  showTakenUserNameError = false;
  
  emailError = '';
  passwordError = '';

  public $emailError: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public $userNameError: BehaviorSubject<string> = new BehaviorSubject<string>('');

  registerForm = new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    userName : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', Validators.required),
    confirmPassword : new FormControl('', Validators.required),
    imageUrl : new FormControl(this.sidebarService.getSelectedAvatar()),
  })

  constructor(
    public helperService : HelperService,
    public sidebarService : SidebarService,
    public accountService : AccountService,
    public userService : UserService,
    public footerService: FooterService,
    private router : Router) {
      this.registerForm.get('email').valueChanges.subscribe(() => {
        this.$emailError.next('');
        this.showTakenEmailError = false;
      });

      this.registerForm.get('userName').valueChanges.subscribe(() => {
        this.$userNameError.next('');
        this.showTakenUserNameError = false;
      });

      this.registerForm.get('password').valueChanges.subscribe(() => {
        this.passwordError = '';
      });

      this.registerForm.get('confirmPassword').valueChanges.subscribe(() => {
        this.passwordError = '';
      });
  }

  register(registerFormValue){
    if(this.registerForm.valid){
      if(this.registerForm.get('password').value != this.registerForm.get('confirmPassword').value){
        this.passwordError = 'Passwords do not match';
        return;
      }

      const userToRegister : UserToRegisterDTO = {
        firstName : registerFormValue.firstName,
        lastName : registerFormValue.lastName,
        userName : registerFormValue.userName,
        email : registerFormValue.email,
        password : registerFormValue.password,
        confirmPassword : registerFormValue.confirmPassword,
        imageUrl: this.sidebarService.getSelectedAvatar(),
      } 

      this.accountService.register(userToRegister).subscribe( {
        next: (res: any) => {
          if(this.helperService.isResponseValid(res) && res.isAuthSuccessful){
            var user = this.accountService.decodeUserFromToken((res).accessToken);
            this.accountService.storeTokensInLocalStorage(res);
    
            this.sidebarService.closeRegisterWindow();
  
            if(this.accountService.isFromAuth()){
              this.accountService.setIsFromAuth(false);
              this.router.navigate(['your-day']);
            }
    
            this.accountService.setUser(user);
            this.registerForm.reset();
          } 
          else{
            if(res.type == "Email"){
              this.$emailError.next(res.errorMessage);
              this.showTakenEmailError = true;
            }  
            if(res.type == "UserName"){
              this.$userNameError.next(res.errorMessage);
              this.showTakenUserNameError = true;
            }
          }
        }, 
        error: (error: any) => {
          this.emailError = error.error.errors.Email[0];
          this.passwordError = error.error.errors.Password[0];
        }
      });
    } else{
      this.registerForm.markAllAsTouched();
    }
  }

  closeRegisterWindow(){
    this.sidebarService.closeRegisterWindow();

    if(this.accountService.isFromAuth()){
      this.accountService.setIsFromAuth(false);
    }
  }

  openLoginWindow(){
    this.sidebarService.closeRegisterWindow();
    this.sidebarService.openLoginWindow();
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
    this.sidebarService.closeRegisterWindow();
    this.sidebarService.openAvatarPickerWindow();
  }
}
