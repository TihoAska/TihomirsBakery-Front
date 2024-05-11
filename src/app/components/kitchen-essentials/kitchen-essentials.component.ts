import { Component } from '@angular/core';

@Component({
  selector: 'app-kitchen-essentials',
  templateUrl: './kitchen-essentials.component.html',
  styleUrl: './kitchen-essentials.component.scss'
})
export class KitchenEssentialsComponent {
  rootUrl = '../../../assets/images/kitchen-essentials/';

  background = { path: this.rootUrl + 'kitchen-background.jpg', name: 'KITCHEN'}

  images = [
    { path: this.rootUrl + 'oats.jpeg', name: 'OATS'},
    { path: this.rootUrl + 'peanut-butter.jpg', name: 'PEANUT-BUTTER'},
    { path: this.rootUrl + 'bananas.jpg', name: 'BANANAS'},
    { path: this.rootUrl + 'milk.jpg', name: 'GYM-MILK'},
    { path: this.rootUrl + 'chicken.jpg', name: 'CHICKEN'},
    { path: this.rootUrl + 'rice.jpg', name: 'RICE'},
    { path: this.rootUrl + 'whey.jpg', name: 'WHEY'},
    { path: this.rootUrl + 'creatine.jpg', name: 'CREATINE'},
  ]

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
