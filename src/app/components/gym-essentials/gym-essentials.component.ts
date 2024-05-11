import { Component } from '@angular/core';

@Component({
  selector: 'app-gym-essentials',
  templateUrl: './gym-essentials.component.html',
  styleUrl: './gym-essentials.component.scss'
})
export class GymEssentialsComponent {

  rootUrl = '../../../assets/images/gym-essentials/'

  background = { path: this.rootUrl + 'pullup-bar-cartoonish.png', name: 'PULLUP-BAR'}

  images = [
    { path: this.rootUrl +  'gym-chalk.jpg', name: 'GYM-CHALK'},
    { path: this.rootUrl +  'gym-straps.jpg', name: 'GYM-STRAPS'},
    { path: this.rootUrl +  'chain-belt.png', name: 'GYM-CHALK'},
    { path: this.rootUrl +  'gym-gloves.jpg', name: 'GYM-STRAPS'},
    { path: this.rootUrl +  'gym-belt.jpg', name: 'GYM-CHALK'},
    { path: this.rootUrl +  'resistance-bands.jpg', name: 'GYM-STRAPS'},
  ]

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
