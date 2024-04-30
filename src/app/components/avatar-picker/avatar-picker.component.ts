import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss'
})
export class AvatarPickerComponent {

  selectedAvatarName = this.sidebarService.pickedAvatar.value.name;
  selectedAvatarIcon = this.sidebarService.pickedAvatar.value.icon;

  constructor(
    public sidebarService : SidebarService,
    public helperService : HelperService,
  ) {

  }

  closeWindow(){
    this.selectedAvatarName = this.sidebarService.pickedAvatar.value.name;
    this.selectedAvatarIcon = this.sidebarService.pickedAvatar.value.icon;

    this.sidebarService.toggleAvatarPickerWindow.next(false);
    this.helperService.dimBackground.next(false);
  }

  pickAvatar(avatarName, avatarIcon){
    this.selectedAvatarName = avatarName;
    this.selectedAvatarIcon = avatarIcon;
    
    console.log('avatar icon: ', avatarIcon)
  }

  confirmPick(){
    this.sidebarService.pickedAvatar.next({
      icon: this.selectedAvatarIcon,
      name: this.selectedAvatarName
    });
    this.sidebarService.toggleAvatarPickerWindow.next(false);
    this.helperService.toggleRegisterWindow.next(true);
  }

  goBack(){
    this.selectedAvatarName = this.sidebarService.pickedAvatar.value.name;
    this.selectedAvatarIcon = this.sidebarService.pickedAvatar.value.icon;

    this.sidebarService.toggleAvatarPickerWindow.next(false);
    this.helperService.toggleRegisterWindow.next(true);
  }
}
