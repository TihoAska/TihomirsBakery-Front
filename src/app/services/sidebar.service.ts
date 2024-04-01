import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  items = [
    { icon: '../../../assets/your-day-white.png', name: 'YOUR DAY' },
    { icon: '../../../assets/workout-locations.png', name: 'WORKOUT SPOTS' },
    { icon: '../../../assets/gym.png', name: 'GYM' },
    { icon: '../../../assets/kitchen.png', name: 'KITCHEN' },
    { icon: '../../../assets/gym-essentials.png', name: 'GYM ESSENTIALS' },
    { icon: '../../../assets/kitchen-essentials.png', name: 'KITCHEN ESSENTIALS' },
  ];

  profilePhoto = { icon: '../../../assets/profile-icon-orange.png', name: 'YOUR PROFILE' } ;
  home = { icon: '../../../assets/workout-white.png', name: 'HOME' };

  constructor() { }
}
