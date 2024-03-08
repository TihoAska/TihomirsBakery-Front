import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  images = [
    { path: '../../../assets/monkey-bar-resized-edited-2.png', name: 'MONKEY-BAR' },
    { path: '../../../assets/oatmeal-with-fruit.jpg', name: 'OATMEAL' },
    { path: '../../../assets/chicken-with-pasta.jpg', name: 'CHICKEN-PASTA' },
    { path: '../../../assets/ham-sandwich.jpg', name: 'HAM-SANDWICH' },
    { path: '../../../assets/fruit-salad.jpg', name: 'FRUIT-SALAD' },
    { path: '../../../assets/pullup-bar-edited.jpg', name: 'PULLUP-BAR' },
    { path: '../../../assets/muscle-up.png', name: 'MUSCLE-UP' },
    { path: '../../../assets/pulls.png', name: 'PULLS' },
  ]

  constructor(private router : Router) {
    
    
  }

  navigateToSw(){
    this.router.navigate(['street-workout']);
  }
}
