import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  items = [
    { icon: '../../../assets/bread-orange.png', name: 'BAGELS' },
    { icon: '../../../assets/sandwich-orange.png', name: 'SANDWICHES' },
    { icon: '../../../assets/croissant.png', name: 'SNACKS' },
    { icon: '../../../assets/pancakes-orange.png', name: 'DESSERTS' },
    { icon: '../../../assets/coffee-cup-orange.png', name: 'HOT BEVERAGE' },
    { icon: '../../../assets/bubble-tea-orange.png', name: 'ICE COFFEE' },
  ];

  profilePhoto = {
    icon: '../../../assets/profile-icon-orange.png',
    name: 'YOUR PROFILE'
  }

  constructor() { }
}
