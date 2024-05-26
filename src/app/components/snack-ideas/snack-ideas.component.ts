import { Component } from '@angular/core';

@Component({
  selector: 'app-snack-ideas',
  templateUrl: './snack-ideas.component.html',
  styleUrl: './snack-ideas.component.scss'
})
export class SnackIdeasComponent {
  background = { path: '../../../assets/images/kitchen-essentials/kitchen-background.jpg', name: 'KITCHEN' };

  images = [
    { path: '../../../assets/images/snack-ideas/ham-sandwich.jpg', name: 'HAM-SANDWICH' },
    { path: '../../../assets/images/snack-ideas/rice-cakes-with-banana.jpg', name: 'RICE-CAKES' },
    { path: '../../../assets/images/snack-ideas/fruit-salad.jpg', name: 'FRUIT-SALAD' },
    { path: '../../../assets/images/snack-ideas/whey-with-banana.jpg', name: 'OATMEAL-SHAKE' },
  ];

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
