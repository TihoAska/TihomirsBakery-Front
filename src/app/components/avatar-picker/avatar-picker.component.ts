import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { HelperService } from '../../services/helper.service';
import { AccountService } from '../../services/account.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss'
})
export class AvatarPickerComponent {

  selectedAvatarName = 'avatar';
  selectedAvatarIcon = (this.accountService.$loggedUser.value.id === -1 || this.accountService.$loggedUser.value.id === undefined) ? this.sidebarService.pickedAvatar.value.icon : this.accountService.$loggedUser.value.imageUrl;


  constructor(
    public sidebarService : SidebarService,
    public helperService : HelperService,
    public accountService : AccountService,
    public userService : UserService
  ) {
    
  }

  ngOnInit(){
    this.accountService.$loggedUser.subscribe(res => {
      if(res.imageUrl){
        this.sidebarService.$selectedAvatar.next(res.imageUrl);
      }
      else{
        this.sidebarService.$selectedAvatar.next(this.selectedAvatarIcon)
      }
    });
  }

  closeWindow(){
    this.selectedAvatarName = this.sidebarService.pickedAvatar.value.name;
    this.selectedAvatarIcon = this.sidebarService.pickedAvatar.value.icon;

    this.sidebarService.$selectedAvatar.next(this.selectedAvatarIcon);

    this.sidebarService.toggleAvatarPickerWindow.next(false);
    this.helperService.dimBackground.next(false);
  }

  pickAvatar(avatarName, avatarIcon){
    this.selectedAvatarName = avatarName;
    this.selectedAvatarIcon = avatarIcon;

    this.sidebarService.$selectedAvatar.next(this.selectedAvatarIcon);
    
    console.log('avatar icon: ', avatarIcon)
  }

  confirmPick(){
    this.sidebarService.pickedAvatar.next({
      icon: this.selectedAvatarIcon,
      name: this.selectedAvatarName
    });

    this.sidebarService.$selectedAvatar.next(this.selectedAvatarIcon);

    if(this.accountService.$loggedUser.value.id != -1){
      this.accountService.$loggedUser.value.imageUrl = this.selectedAvatarIcon;
      this.sidebarService.toggleAvatarPickerWindow.next(false);
      this.sidebarService.toggleProfile.next(true);

      this.userService.updateUser(this.accountService.$loggedUser.value).subscribe();

    } 
    else{
      this.sidebarService.toggleAvatarPickerWindow.next(false);
      this.helperService.toggleRegisterWindow.next(true);
    }
  }

  goBack(){
    this.selectedAvatarName = this.sidebarService.pickedAvatar.value.name;
    this.selectedAvatarIcon = this.sidebarService.pickedAvatar.value.icon;

    this.sidebarService.$selectedAvatar.next(this.selectedAvatarIcon);

    if(this.accountService.$loggedUser.value.id != -1){
      this.sidebarService.toggleAvatarPickerWindow.next(false);  
      this.sidebarService.toggleProfile.next(true);
    } else{
      this.sidebarService.toggleAvatarPickerWindow.next(false);
      this.helperService.toggleRegisterWindow.next(true);
    }
  }
}
