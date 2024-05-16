import { Component } from '@angular/core';

@Component({
  selector: 'app-lunch-ideas',
  templateUrl: './lunch-ideas.component.html',
  styleUrl: './lunch-ideas.component.scss'
})
export class LunchIdeasComponent {
  background = { path: '../../../assets/images/kitchen-essentials/kitchen-background.jpg', name: 'KITCHEN' };

  images = [
    { path: '../../../assets/images/lunch-ideas/chicken-with-pasta.jpg', name: 'CHICKEN WITH PASTA' },
    { path: '../../../assets/images/lunch-ideas/beef-tomato-pasta.jpg', name: 'BEEF WITH TOMATO' },
    { path: '../../../assets/images/lunch-ideas/chicken-and-broccoli.jpg', name: 'CHICKEN WITH BROCCOLI' },
    { path: '../../../assets/images/lunch-ideas/chicken-tortilla.jpg', name: 'CHICKEN TORTILLA' },
  ];
}
