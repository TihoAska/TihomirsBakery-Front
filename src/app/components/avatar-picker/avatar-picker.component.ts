import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { HelperService } from '../../services/helper.service';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss',
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
export class AvatarPickerComponent {
  selectedAvatarIcon = '';
  confirmedAvatarIcon = '';

  constructor(
    public sidebarService: SidebarService,
    public helperService: HelperService,
    public accountService: AccountService,
    public userService: UserService
  ) {
    
  }

  ngOnInit(){
    this.accountService.$loggedUser.subscribe(res => {
      if(res.imageUrl){
        this.selectedAvatarIcon = res.imageUrl;
        this.confirmedAvatarIcon = res.imageUrl;
        this.sidebarService.setSelectedAvatar(res.imageUrl);
      }
      else{
        this.selectedAvatarIcon = this.sidebarService.getDefaultAvatar();
        this.confirmedAvatarIcon = this.sidebarService.getDefaultAvatar();
        this.sidebarService.setSelectedAvatar(this.selectedAvatarIcon)
      }
    });
  }

  closeWindow(){
    this.sidebarService.setSelectedAvatar(this.confirmedAvatarIcon);
    this.sidebarService.closeAvatarPickerWindow();
    this.helperService.undimBackground();
  }

  selectAvatar(avatarIcon){
    this.sidebarService.setSelectedAvatar(avatarIcon);
  }

  confirmSelectedAvatar(){
    this.sidebarService.confirmSelectedAvatar();
    this.confirmedAvatarIcon = this.sidebarService.getConfirmedAvatar();

    if(this.accountService.isUserLoggedIn()){
      this.sidebarService.closeAvatarPickerWindow();
      this.sidebarService.openProfileWindow();
      this.userService.updateUser(this.accountService.$loggedUser.value).subscribe();
    } 
    else{
      this.sidebarService.setConfirmedAvatarForRegister(this.sidebarService.getSelectedAvatar());
      this.sidebarService.closeAvatarPickerWindow();
      this.sidebarService.openRegisterWindow();
    }
  }

  goBack(){
    if(this.accountService.isUserLoggedIn()){
      this.sidebarService.setSelectedAvatar(this.confirmedAvatarIcon);
      this.sidebarService.closeAvatarPickerWindow();
      this.sidebarService.openProfileWindow();
    } else{
      this.sidebarService.setSelectedAvatar(this.sidebarService.getConfirmedAvatarForRegister());
      this.sidebarService.closeAvatarPickerWindow();
      this.sidebarService.openRegisterWindow();
    }
  }
}
