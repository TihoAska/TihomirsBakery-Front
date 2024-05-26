import { Component } from '@angular/core';

@Component({
  selector: 'app-breakfast-ideas',
  templateUrl: './breakfast-ideas.component.html',
  styleUrl: './breakfast-ideas.component.scss'
})
export class BreakfastIdeasComponent {
  background = { path: '../../../assets/images/kitchen-essentials/kitchen-background.jpg', name: 'KITCHEN' };

  images = [
    { path: '../../../assets/images/breakfast-ideas/pizza-omelette.jpg', name: 'PIZZA OMELETTE' },
    { path: '../../../assets/images/breakfast-ideas/oatmea-banana-whey.jpg', name: 'OATMEAL-BANANA' },
    { path: '../../../assets/images/breakfast-ideas/oatmeal-shake.jpg', name: 'OATMEAL-SHAKE' },
    { path: '../../../assets/images/breakfast-ideas/whey-with-banana.jpg', name: 'OATMEAL-SHAKE' },
  ];

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
