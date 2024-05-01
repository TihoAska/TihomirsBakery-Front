import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public toggleLogin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public toggleProfile : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  avatars = [
    { icon: '../../../assets/images/avatars/avatar-male-1.png', name: 'avatar-male-1'},
    { icon: '../../../assets/images/avatars/avatar-male-2.png', name: 'avatar-male-2'},
    { icon: '../../../assets/images/avatars/avatar-male-3.png', name: 'avatar-male-3'},
    { icon: '../../../assets/images/avatars/avatar-male-4.png', name: 'avatar-male-4'},
    { icon: '../../../assets/images/avatars/avatar-male-5.png', name: 'avatar-male-5'},
    { icon: '../../../assets/images/avatars/avatar-male-6.png', name: 'avatar-male-6'},
    { icon: '../../../assets/images/avatars/avatar-male-7.png', name: 'avatar-male-7'},
    { icon: '../../../assets/images/avatars/avatar-male-8.png', name: 'avatar-male-8'},
    { icon: '../../../assets/images/avatars/avatar-female-1.png', name: 'avatar-female-1'},
    { icon: '../../../assets/images/avatars/avatar-female-2.png', name: 'avatar-female-2'},
    { icon: '../../../assets/images/avatars/avatar-female-3.png', name: 'avatar-female-3'},
    { icon: '../../../assets/images/avatars/avatar-female-4.png', name: 'avatar-female-4'},
    { icon: '../../../assets/images/avatars/avatar-female-5.png', name: 'avatar-female-5'},
    { icon: '../../../assets/images/avatars/avatar-female-6.png', name: 'avatar-female-6'},
    { icon: '../../../assets/images/avatars/avatar-female-7.png', name: 'avatar-female-7'},
  ]
  
  public toggleAvatarPickerWindow : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public pickedAvatar : BehaviorSubject<Avatar> = new BehaviorSubject({ icon: this.avatars[0].icon, name : this.avatars[0].name});

  items = [
    { icon: '../../../assets/your-day-white.png', name: 'YOUR DAY' },
    { icon: '../../../assets/workout-locations.png', name: 'WORKOUT SPOTS' },
    { icon: '../../../assets/gym.png', name: 'GYM' },
    { icon: '../../../assets/kitchen.png', name: 'KITCHEN' },
    { icon: '../../../assets/gym-essentials.png', name: 'GYM ESSENTIALS' },
    { icon: '../../../assets/kitchen-essentials.png', name: 'KITCHEN ESSENTIALS' },
  ];

  public userNotLoggedInAvatar = { icon: '../../../assets/profile-icon.png', name: 'YOUR PROFILE' };
  home = { icon: '../../../assets/workout-white.png', name: 'HOME' };

  constructor() { }
}

export interface Avatar{
  icon: string,
  name: string
}
