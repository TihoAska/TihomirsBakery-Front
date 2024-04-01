import { Component } from '@angular/core';

@Component({
  selector: 'app-kitchen-essentials',
  templateUrl: './kitchen-essentials.component.html',
  styleUrl: './kitchen-essentials.component.scss'
})
export class KitchenEssentialsComponent {
  background = { path: '../../../assets/kitchen-background.jpg', name: 'KITCHEN'}

  images = [
    { path: '../../../assets/oats-cartoonish.png', name: 'OATS'},
    { path: '../../../assets/peanut-butter-cartoonish.png', name: 'PEANUT-BUTTER'},
    { path: '../../../assets/bananas-cartoonish.png', name: 'BANANAS'},
    { path: '../../../assets/milk-cartoonish.png', name: 'GYM-MILK'},
    { path: '../../../assets/chicken-cartoonish.png', name: 'CHICKEN'},
    { path: '../../../assets/rice-cartoonish.png', name: 'RICE'},
    { path: '../../../assets/whey-cartoonish.png', name: 'WHEY'},
    { path: '../../../assets/creatine-cartoonish.png', name: 'CREATINE'},
  ]

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
