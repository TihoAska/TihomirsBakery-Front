import { HelperService } from './../../services/helper.service';
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { NutritionService } from '../../services/nutrition.service';
import { WorkoutService } from '../../services/workout.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrl: './your-profile.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.3s ease-in'),
      ]),
      transition('* => void', [
        animate(
          '0.3s ease-out',
          style({ opacity: 0, transform: 'scale(0.5)' })
        ),
      ]),
    ]),
  ],
})
export class YourProfileComponent {

  constructor(
    public sidebarService : SidebarService,
    public accountService : AccountService,
    public helperService : HelperService,
    public nutritionService : NutritionService,
    private router : Router) {
    
  }

  closeProfile(){
    this.sidebarService.$toggleProfile.next(false);
    this.helperService.$dimBackground.next(false);
  }

  logOut(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.sidebarService.$toggleProfile.next(false);
    this.helperService.$dimBackground.next(false);

    if(this.router.url == '/your-day'){
      this.router.navigate(['']);
    }

    this.emptyValues();
    
    this.accountService.$loggedUser.next(new User(-1));
  }

  toggleAvatarPicker(){
    this.sidebarService.$toggleProfile.next(false);
    this.sidebarService.$toggleAvatarPickerWindow.next(true);
  }

  emptyValues(){
    this.nutritionService.$totalMealsValue.next({
      totalCalories: 0,
      totalFats: 0,
      totalCarbs: 0,
      totalProtein: 0,
    });
    this.nutritionService.$pickedBreakfastMealsValues.next({
      calories: 0,
      carbs: 0,
      protein: 0,
      fats: 0,
    });
    this.nutritionService.$pickedLunchMealsValues.next({
      calories: 0,
      carbs: 0,
      protein: 0,
      fats: 0,
    });
    this.nutritionService.$pickedDinnerMealsValues.next({
      calories: 0,
      carbs: 0,
      protein: 0,
      fats: 0,
    });

    this.nutritionService.$pickedBreakfastMeals.next([]);
    this.nutritionService.$pickedLunchMeals.next([]);
    this.nutritionService.$pickedDinnerMeals.next([]);

    this.nutritionService.isBreakfastAdded = false;
    this.nutritionService.isLunchAdded = false;
    this.nutritionService.isDinnerAdded = false;
  }
}
