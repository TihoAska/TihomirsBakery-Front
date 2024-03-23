import { Component, ElementRef, Renderer2, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('workout') workoutContainer  : ElementRef;
  @ViewChild('cooking') cookingContainer  : ElementRef;

  images = [
    { path: '../../../assets/monkey-bar-resized-edited-2.png', name: 'MONKEY-BAR' },
    { path: '../../../assets/oatmeal-with-fruit.jpg', name: 'OATMEAL' },
    { path: '../../../assets/chicken-with-pasta.jpg', name: 'CHICKEN-PASTA' },
    { path: '../../../assets/ham-sandwich.jpg', name: 'HAM-SANDWICH' },
    { path: '../../../assets/fruit-salad.jpg', name: 'FRUIT-SALAD' },
    { path: '../../../assets/pullup-bar-edited.jpg', name: 'PULLUP-BAR' },
    { path: '../../../assets/home-gym.jpg', name: 'MUSCLE-UP' },
    { path: '../../../assets/home-gym-2.jpeg', name: 'PULLS' },
  ]

  constructor(
    private router : Router, 
    private renderer: Renderer2, 
    private helperService : HelperService) {    

  }

  ngOnInit() {
    this.helperService.scrollTo.subscribe(res => {
      if (res === "GYM") {
        this.router.navigate(['/']).then(() => {
          this.workoutContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else if (res === "KITCHEN") {
        this.router.navigate(['/']).then(() => {
          const yOffset = -200;
          const cookingContainerRect = this.cookingContainer.nativeElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetOffset = cookingContainerRect.top + scrollTop - yOffset;
          window.scrollTo({ top: targetOffset, behavior: "smooth" });
        });
      }
    });
  }

  navigateToSw(){
    this.router.navigate(['street-workout']);
  }
}
