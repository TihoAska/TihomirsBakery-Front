import { Component } from '@angular/core';

@Component({
  selector: 'app-dinner-ideas',
  templateUrl: './dinner-ideas.component.html',
  styleUrl: './dinner-ideas.component.scss'
})
export class DinnerIdeasComponent {
  background = { path: '../../../assets/images/kitchen-essentials/kitchen-background.jpg', name: 'KITCHEN' };

  images = [
    { path: '../../../assets/images/dinner-ideas/boiled-eggs.jpg', name: 'PIZZA OMELETTE' },
    { path: '../../../assets/images/dinner-ideas/tuna-with-pasta.jpg', name: 'OATMEAL-BANANA' },
    { path: '../../../assets/images/dinner-ideas/sardines-on-toast.jpg', name: 'OATMEAL-SHAKE' },
    { path: '../../../assets/images/dinner-ideas/semolina-with-whey.jpg', name: 'OATMEAL-SHAKE' },
  ];

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
