import { Component } from '@angular/core';

@Component({
  selector: 'app-gym-essentials',
  templateUrl: './gym-essentials.component.html',
  styleUrl: './gym-essentials.component.scss'
})
export class GymEssentialsComponent {

  background = { path: '../../../assets/pullup-bar-edited.jpg', name: 'PULLUP-BAR'}

  images = [
    { path: '../../../assets/gym-chalk.jpg', name: 'GYM-CHALK'},
    { path: '../../../assets/gym-straps.jpg', name: 'GYM-STRAPS'},
    { path: '../../../assets/chain-belt.png', name: 'GYM-CHALK'},
    { path: '../../../assets/gym-gloves.jpg', name: 'GYM-STRAPS'},
    { path: '../../../assets/gym-belt.jpg', name: 'GYM-CHALK'},
    { path: '../../../assets/resistance-bands.jpg', name: 'GYM-STRAPS'},
  ]

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
