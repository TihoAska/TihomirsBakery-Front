import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HelperService } from './helper.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  $hasAvatarLoaded = new BehaviorSubject<boolean>(false);

  private _isAvatarPickerWindowOpen = false;
  private _isLoginWindowOpen = false;
  private _isProfileWindowOpen = false;
  private _isRegisterWindowOpen = false;
  private _selectedAvatar = '';
  private _confirmedAvatar = '';
  private _confirmedAvatarForRegister = 'assets/images/avatars/avatar-male-1.png';
  private _defaultAvatar = 'assets/images/avatars/avatar-male-1.png';
  

  avatars = [
    { icon: 'assets/images/avatars/avatar-male-1.png', name: 'avatar-male-1'},
    { icon: 'assets/images/avatars/avatar-male-2.png', name: 'avatar-male-2'},
    { icon: 'assets/images/avatars/avatar-male-3.png', name: 'avatar-male-3'},
    { icon: 'assets/images/avatars/avatar-male-4.png', name: 'avatar-male-4'},
    { icon: 'assets/images/avatars/avatar-male-5.png', name: 'avatar-male-5'},
    { icon: 'assets/images/avatars/avatar-male-6.png', name: 'avatar-male-6'},
    { icon: 'assets/images/avatars/avatar-male-7.png', name: 'avatar-male-7'},
    { icon: 'assets/images/avatars/avatar-male-8.png', name: 'avatar-male-8'},
    { icon: 'assets/images/avatars/avatar-female-1.png', name: 'avatar-female-1'},
    { icon: 'assets/images/avatars/avatar-female-2.png', name: 'avatar-female-2'},
    { icon: 'assets/images/avatars/avatar-female-3.png', name: 'avatar-female-3'},
    { icon: 'assets/images/avatars/avatar-female-4.png', name: 'avatar-female-4'},
    { icon: 'assets/images/avatars/avatar-female-5.png', name: 'avatar-female-5'},
    { icon: 'assets/images/avatars/avatar-female-6.png', name: 'avatar-female-6'},
    { icon: 'assets/images/avatars/avatar-female-7.png', name: 'avatar-female-7'},
  ]

  items = [
    { icon: 'assets/images/sidebar-icons/your-day-white.png', name: 'YOUR DAY' },
    { icon: 'assets/images/sidebar-icons/workout-locations.png', name: 'WORKOUT SPOTS' },
    { icon: 'assets/images/sidebar-icons/gym.png', name: 'GYM' },
    { icon: 'assets/images/sidebar-icons/kitchen.png', name: 'KITCHEN' },
    { icon: 'assets/images/sidebar-icons/gym-essentials.png', name: 'GYM ESSENTIALS' },
    { icon: 'assets/images/sidebar-icons/kitchen-essentials.png', name: 'KITCHEN ESSENTIALS' },
  ];

  constructor(private helperService: HelperService, private accountService: AccountService) { }

  openRegisterWindow(){
    this._isRegisterWindowOpen = true;
    this.helperService.dimBackground();
  }

  closeRegisterWindow(){
    this._isRegisterWindowOpen = false;
    this.helperService.undimBackground();
  }

  isRegisterWindowOpen(){
    return this._isRegisterWindowOpen;
  }

  getDefaultAvatar(){
    return this._defaultAvatar;
  }

  setSelectedAvatar(selectedAvatar){
    this._selectedAvatar = selectedAvatar;
  }
  
  getSelectedAvatar(){
    return this._selectedAvatar;
  }

  confirmSelectedAvatar(){
    this._confirmedAvatar = this._selectedAvatar;
    this.accountService.$loggedUser.value.imageUrl = this._selectedAvatar;
  }

  getConfirmedAvatar(){
    return this._confirmedAvatar;
  }

  setConfirmedAvatarForRegister(confirmedAvatar){
    this._confirmedAvatarForRegister = confirmedAvatar;
  }
  
  getConfirmedAvatarForRegister(){
    return this._confirmedAvatarForRegister;
  }

  closeProfileWindow(){
    this._isProfileWindowOpen = false;
    this.helperService.undimBackground();
  }

  openProfileWindow(){
    this._isProfileWindowOpen = true;
    this.helperService.dimBackground();
  }

  isProfileWindowOpen(){
    return this._isProfileWindowOpen;
  }

  openAvatarPickerWindow(){
    this._isAvatarPickerWindowOpen = true;
    this.helperService.dimBackground();
  }

  closeAvatarPickerWindow(){
    this._isAvatarPickerWindowOpen = false;
    this.helperService.undimBackground();
  }

  isAvatarPickerWindowOpen(){
    return this._isAvatarPickerWindowOpen;
  }

  openLoginWindow(){
    this._isLoginWindowOpen = true;
    this.helperService.dimBackground();
  }

  closeLoginWindow(){
    this._isLoginWindowOpen = false;
    this.helperService.undimBackground();
  }

  isLoginWindowOpen(){
    return this._isLoginWindowOpen;
  }
}

export interface Avatar{
  icon: string,
  name: string
}
