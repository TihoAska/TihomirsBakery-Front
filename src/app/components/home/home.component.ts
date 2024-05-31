import { Component, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { SidebarService } from '../../services/sidebar.service';
import { loadFull } from 'tsparticles';
import type { Engine, Container } from "@tsparticles/engine";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('workout') workoutContainer  : ElementRef;
  @ViewChild('cooking') cookingContainer  : ElementRef;

  rootUrl = '../../../assets/images/home/';

  // id = "tsparticles";
  // particlesUrl = "http://foo.bar/particles.json";

  images = [
    { path: this.rootUrl + 'monkey-bar-cartoonish.png', name: 'MONKEY-BAR' },
    { path: this.rootUrl + 'oatmeal-with-fruit.jpg', name: 'OATMEAL' },
    { path: this.rootUrl + 'chicken-with-pasta.jpg', name: 'CHICKEN-PASTA' },
    { path: this.rootUrl + 'ham-sandwich.jpg', name: 'HAM-SANDWICH' },
    { path: this.rootUrl + 'fruit-salad.jpg', name: 'FRUIT-SALAD' },
    { path: this.rootUrl + 'pullup-bar-edited.jpg', name: 'PULLUP-BAR' },
    { path: this.rootUrl + 'home-gym.jpg', name: 'MUSCLE-UP' },
    { path: this.rootUrl + 'home-gym-2.jpeg', name: 'PULLS' },
  ];

  constructor(
    private router : Router, 
    private helperService : HelperService,
    public sidebarService : SidebarService) {    

  }

  ngOnInit() {
    window.scrollTo(0,0);
    
    this.helperService.$scrollTo.subscribe(res => {
      if (res === "GYM") {
        this.router.navigate(['/']).then(() => {
          this.workoutContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else if (res === "KITCHEN") {
        this.router.navigate(['/']).then(() => {
          const yOffset = -200;
          const cookingContainerRect = this.cookingContainer.nativeElement.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const targetOffset = cookingContainerRect.top + scrollTop - yOffset;
          window.scrollTo({ top: targetOffset, behavior: "smooth" });
        });
      }
    });
  }

  // particlesLoaded(container: Container): void {
  //   console.log(container);
  // }

  // async particlesInit(engine: Engine): Promise<void> {
  //   await loadFull(engine);
  // }

  navigateToSw(){
    this.router.navigate(['street-workout']);
  }

  navigateToGym(){
    this.router.navigate(['gym']);
  }

  navigateToMeal(mealType : string){
    if(mealType == 'breakfast'){
      this.router.navigate(['breakfast-ideas']);
    } 
    else if(mealType == 'lunch'){
      this.router.navigate(['lunch-ideas']);
    }
    else if(mealType == 'snack'){
      this.router.navigate(['snack-ideas']);
    }
    else if(mealType == 'dinner'){
      this.router.navigate(['dinner-ideas']);
    }
  }
}
