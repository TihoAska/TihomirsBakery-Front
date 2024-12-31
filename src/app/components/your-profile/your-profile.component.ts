import { HelperService } from './../../services/helper.service';
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AccountService } from '../../services/account.service';
import { NutritionService } from '../../services/nutrition.service';
import { WorkoutService } from '../../services/workout.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrl: './your-profile.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' }),
        animate('0.3s ease-in'),
      ]),
      transition('* => void', [
        animate(
          '0.3s ease-out',
          style({ opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' })
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
    public workoutService : WorkoutService,
    private userService: UserService) {
    
  }

  logOut(){
    this.userService.logOut();
    this.resetValues();
  }

  toggleAvatarPicker(){
    this.sidebarService.closeProfileWindow();
    this.sidebarService.openAvatarPickerWindow();
  }

  resetValues(){
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

    this.nutritionService.setIsBreakfastAdded(false);
    this.nutritionService.setIsLunchAdded(false);
    this.nutritionService.setIsDinnerAdded(false);

    this.workoutService.setIsWorkoutAdded(false);
    this.workoutService.$workoutValues.next({
      name: '',
      type: '',
      duration: '',
      totalCalories: 0,
    });
  }
}
