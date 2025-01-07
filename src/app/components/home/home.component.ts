import { Component, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { SidebarService } from '../../services/sidebar.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('workout') workoutContainer: ElementRef;
  @ViewChild('cooking') cookingContainer: ElementRef;
  isImageLoaded = false;
  loadingTexts = ['loading....', 'loading.....'];

  constructor(
    private router: Router, 
    private helperService: HelperService,
    public sidebarService: SidebarService,
    public loadingService: LoadingService) {    

  }

  onImageLoad(){
    this.isImageLoaded = true;
    this.loadingService.hideLoadingOverlay();
  }

  ngOnInit() {
    this.loadingService.showLoadingOverlay(this.loadingTexts);
    window.scrollTo(0,0);
    
    this.helperService.$scrollTo.subscribe(res => {
      if (res === "GYM") {
        this.router.navigate(['/']).then(() => {
          this.scrollToGymPartOfThePage();
        });
      } else if (res === "KITCHEN") {
        this.router.navigate(['/']).then(() => {
          this.scrollToKitchenPartOfThePage();
        });
      }
    });
  }

  ngOnDestroy(){
    this.loadingService.hideLoadingOverlay();
  }

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

  scrollToGymPartOfThePage(){
    this.workoutContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  scrollToKitchenPartOfThePage(){
    const yOffset = -200;
    const cookingContainerRect = this.cookingContainer.nativeElement.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetOffset = cookingContainerRect.top + scrollTop - yOffset;
    window.scrollTo({ top: targetOffset, behavior: "smooth" });
  }
}
