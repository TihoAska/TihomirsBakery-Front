import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  items = [
    { icon: '../../../assets/gym.png', name: 'GYM' },
    { icon: '../../../assets/kitchen.png', name: 'KITCHEN' },
    { icon: '../../../assets/gym-essentials.png', name: 'GYM ESSENTIALS' },
    { icon: '../../../assets/kitchen-essentials.png', name: 'KITCHEN ESSENTIALS' },
    // { icon: '../../../assets/sandwich-white.png', name: 'SANDWICHES' },
    // { icon: '../../../assets/croissant-white.png', name: 'SNACKS' },
    // { icon: '../../../assets/pancake-white.png', name: 'DESSERTS' },
    // { icon: '../../../assets/coffee-white.png', name: 'HOT BEVERAGE' },
    // { icon: '../../../assets/shake-white.png', name: 'SHAKES' },
  ];

  profilePhoto = { icon: '../../../assets/profile-icon-orange.png', name: 'YOUR PROFILE' }
  yourDay = { icon: '../../../assets/your-day-white.png', name: 'YOUR DAY' }
  workout = { icon: '../../../assets/workout-white.png', name: 'WORKOUT SPOTS' }
  
  constructor() { }
}
