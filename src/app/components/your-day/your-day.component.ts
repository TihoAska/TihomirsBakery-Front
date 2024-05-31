import { addedMeal } from './../../services/nutrition.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApexDataLabels, ApexFill, ApexLegend, ApexMarkers, ApexOptions, ApexPlotOptions, ApexTooltip, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { distinctUntilChanged, interval, take } from 'rxjs';
import { FooterService } from '../../services/footer.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { MealService } from '../../services/meal.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NutritionService } from '../../services/nutrition.service';
import { AccountService } from '../../services/account.service';
import { SidebarService } from '../../services/sidebar.service';
import { WorkoutService } from '../../services/workout.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-your-day',
  templateUrl: './your-day.component.html',
  styleUrl: './your-day.component.scss',
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
export class YourDayComponent {
  images = [
    { path: '../../../assets/images/your-day/your-day-kitchen.jpg', name: 'KITCHEN-BACKGROUND' },
  ];

  searchControl = new FormControl();

  allMeals: any[] = [];
  filteredMeals: any[] = [];
  pickedMeals: any[] = [];

  pickedMealsBeforeConfirm: any[] = [];

  isAddMealVisible = false;
  isEditMealVisible = false;
  isAddWorkoutVisible = false;
  isEditWorkoutVisible = false;

  showQuery = true;
  isFoodPicked = false;

  mainMealName = '';

  pickedMealsValue = { protein: 0, fats: 0, carbs: 0, calories: 0 };

  tempPickedMealsValue = { protein: 0, fats: 0, carbs: 0, calories: 0 };

  pickedMealsBeforeConfirmValues = { protein: 0, fats: 0, carbs: 0, calories: 0 };
  pickedBreakfastBeforeConfirmValues = { protein: 0, fats: 0, carbs: 0, calories: 0 };
  pickedLunchBeforeConfirmValues = { protein: 0, fats: 0, carbs: 0, calories: 0 };
  pickedDinnerBeforeConfirmValues = { protein: 0, fats: 0, carbs: 0, calories: 0 };

  maxProteinValue = 200;
  maxFatsValue = 100;
  maxCarbsValue = 400;

  workoutForm: FormGroup;
  
  constructor(
    public footerService: FooterService,
    public helperService: HelperService,
    public mealService: MealService,
    public nutritionService : NutritionService,
    public accountService : AccountService,
    public sidebarService : SidebarService,
    public workoutService : WorkoutService,
    private fb : FormBuilder,
  ) {}

  ngOnInit() {
    window.scrollTo(0,0);

    this.mealService.getAll().subscribe((data) => {
      this.mealService.$allMeals.next(data);
      this.allMeals = data;
    });
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((query) => {
        this.filterMeals(query);
    });

    this.workoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
      type: ['', Validators.required],
      durationHrs: [0],
      durationMin: [0],
      durationSec: [0],
      totalCalories: [0, Validators.required]
    });

    this.workoutService.$workoutValues.subscribe(res => {
      var workoutType = this.checkWorkoutType(res);

      this.workoutForm.patchValue({
        name: res.name,
        type: workoutType,
        durationHrs: res.duration[0] + res.duration[1],
        durationMin: res.duration[3] + res.duration[4],
        durationSec: res.duration[6] + res.duration[7],
        totalCalories: res.totalCalories
      });
    })
  }

  checkWorkoutType(workout){
    if(
      workout.workoutType == 0 || 
      workout.workoutType == "Cardio" || 
      workout.type == 0 || 
      workout.type == "Cardio")
    {
      return "Cardio"
    } 
    else if(
      workout.workoutType == 1 || 
      workout.workoutType == "StrengthTraining" || 
      workout.type == 1 || 
      workout.type == "StrengthTraining")
    {
      return "StrengthTraining"
    } 
    else if(workout.workoutType == 2 || 
      workout.workoutType == "BallSports" || 
      workout.type == 2 || 
      workout.type == "BallSports")
    {
      return "BallSports"
    } 
    else if(workout.workoutType == 3 || 
      workout.workoutType == "RacquetSports" || 
      workout.type == 3 || 
      workout.type == "RacquetSports")
    {
      return "RacquetSports"
    } 

    return "Cardio";
  }

  filterMeals(query: string) {
    this.showQuery = true;
    if (!query.trim()) {
      this.filteredMeals = [];
    } else {
      this.filteredMeals = this.allMeals.filter((meal) =>
        meal.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  toggleAddMeal(mainMealName: string) {
    this.helperService.$dimBackground.next(true);

    if (mainMealName == 'breakfast') {
      this.pickedMeals = this.nutritionService.$pickedBreakfastMeals.value.slice();
      this.pickedMealsValue = { ...this.nutritionService.$pickedBreakfastMealsValues.value }
    } else if (mainMealName == 'lunch') {
      this.pickedMeals = this.nutritionService.$pickedLunchMeals.value.slice();
      this.pickedMealsValue = { ...this.nutritionService.$pickedLunchMealsValues.value }
    } else if (mainMealName == 'dinner') {
      this.pickedMeals = this.nutritionService.$pickedDinnerMeals.value.slice();
      this.pickedMealsValue = { ...this.nutritionService.$pickedDinnerMealsValues.value }
    }

    if (this.mainMealName == mainMealName) {
      this.isAddMealVisible = !this.isAddMealVisible;
    } else {
      this.mainMealName = mainMealName;
      this.isAddMealVisible = true;
    }
  }

  closeAddMeal() {
    this.helperService.$dimBackground.next(false);
    this.isAddMealVisible = false;
    this.isFoodPicked = false;

    if (this.mainMealName == 'breakfast') {
      this.nutritionService.$pickedBreakfastMealsValues.next({
        protein: 0,
        fats: 0,
        carbs: 0,
        calories: 0,
      })
      this.nutritionService.$pickedBreakfastMeals.next([]);
      this.pickedMeals = [];
      this.pickedMealsValue = this.nutritionService.$pickedBreakfastMealsValues.value;
    } else if (this.mainMealName == 'lunch') {
      this.nutritionService.$pickedLunchMealsValues.next({
        protein: 0,
        fats: 0,
        carbs: 0,
        calories: 0,
      });
      this.nutritionService.$pickedLunchMeals.next([]);
      this.pickedMeals = [];
      this.pickedMealsValue = this.nutritionService.$pickedLunchMealsValues.value;
    } else if (this.mainMealName == 'dinner') {
      this.nutritionService.$pickedDinnerMealsValues.next({
        protein: 0,
        fats: 0,
        carbs: 0,
        calories: 0,
      });
      this.nutritionService.$pickedDinnerMeals.next([]);
      this.pickedMeals = [];
      this.pickedMealsValue = this.nutritionService.$pickedDinnerMealsValues.value;
    }
  }

  closeEditMeal() {
    this.helperService.$dimBackground.next(false);
    this.isEditMealVisible = false;

    this.pickedBreakfastBeforeConfirmValues = { protein: 0, fats: 0, carbs: 0, calories: 0 }
    this.pickedLunchBeforeConfirmValues = { protein: 0, fats: 0, carbs: 0, calories: 0 }
    this.pickedDinnerBeforeConfirmValues = { protein: 0, fats: 0, carbs: 0, calories: 0 }

    this.pickedMealsBeforeConfirm = [];
  }

  pickMeal(meal: any, window: string) {
    this.showQuery = false;
    this.isFoodPicked = true;

    if (window == 'add') {
      this.pickedMeals.push(meal);
      if (this.mainMealName == 'breakfast') {
        this.nutritionService.$pickedBreakfastMealsValues.next({
          protein: this.nutritionService.$pickedBreakfastMealsValues.value.protein + meal.protein,
          carbs: this.nutritionService.$pickedBreakfastMealsValues.value.carbs + meal.carbs,
          fats: this.nutritionService.$pickedBreakfastMealsValues.value.fats + meal.fats,
          calories: this.nutritionService.$pickedBreakfastMealsValues.value.calories + meal.calories,
        });
        this.pickedMealsValue = this.nutritionService.$pickedBreakfastMealsValues.value;
      } else if (this.mainMealName == 'lunch') {
        this.nutritionService.$pickedLunchMealsValues.next({
          protein: this.nutritionService.$pickedLunchMealsValues.value.protein + meal.protein,
          carbs: this.nutritionService.$pickedLunchMealsValues.value.carbs + meal.carbs,
          fats: this.nutritionService.$pickedLunchMealsValues.value.fats + meal.fats,
          calories: this.nutritionService.$pickedLunchMealsValues.value.calories + meal.calories,
        })
        this.pickedMealsValue = this.nutritionService.$pickedLunchMealsValues.value;
      } else if (this.mainMealName == 'dinner') {
        this.nutritionService.$pickedDinnerMealsValues.next({
          protein: this.nutritionService.$pickedDinnerMealsValues.value.protein + meal.protein,
          carbs: this.nutritionService.$pickedDinnerMealsValues.value.carbs + meal.carbs,
          fats: this.nutritionService.$pickedDinnerMealsValues.value.fats + meal.fats,
          calories: this.nutritionService.$pickedDinnerMealsValues.value.calories + meal.calories,
        })
        this.pickedMealsValue = this.nutritionService.$pickedDinnerMealsValues.value;
      }
    } else if (window == 'edit') {
      if (this.mainMealName == 'breakfast') {
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedBreakfastBeforeConfirmValues.protein += meal.protein,
          carbs: this.pickedBreakfastBeforeConfirmValues.carbs += meal.carbs,
          fats: this.pickedBreakfastBeforeConfirmValues.fats += meal.fats,
          calories: this.pickedBreakfastBeforeConfirmValues.calories += meal.calories,
        };
      } else if (this.mainMealName == 'lunch') {
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedLunchBeforeConfirmValues.protein += meal.protein,
          carbs: this.pickedLunchBeforeConfirmValues.carbs += meal.carbs,
          fats:this.pickedLunchBeforeConfirmValues.fats += meal.fats,
          calories: this.pickedLunchBeforeConfirmValues.calories += meal.calories,
        };
      } else if (this.mainMealName == 'dinner') {
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedDinnerBeforeConfirmValues.protein += meal.protein,
          carbs: this.pickedDinnerBeforeConfirmValues.carbs += meal.carbs,
          fats: this.pickedDinnerBeforeConfirmValues.fats += meal.fats,
          calories: this.pickedDinnerBeforeConfirmValues.calories += meal.calories,
        };
      }
      this.pickedMealsBeforeConfirm.push(meal);
    }
  }

  addMeal() {
    this.helperService.$dimBackground.next(false);
    this.isAddMealVisible = false;
    this.isFoodPicked = false;

    var addedMeals = [];

    this.pickedMeals.forEach(pickedMeal => {
      addedMeals.push({
        name: pickedMeal.name,
        calories: pickedMeal.calories,
        protein: pickedMeal.protein,
        carbs: pickedMeal.carbs,
        fats: pickedMeal.fats
      })
    });

    if (this.mainMealName == 'breakfast') {
      this.nutritionService.isBreakfastAdded = true;
      const currentMeals = this.nutritionService.$pickedBreakfastMeals.value;
      const updatedMeals = currentMeals.concat(addedMeals);
      this.nutritionService.$pickedBreakfastMeals.next(updatedMeals);
    } else if (this.mainMealName == 'lunch') {
      this.nutritionService.isLunchAdded = true;
      const currentMeals = this.nutritionService.$pickedLunchMeals.value;
      const updatedMeals = currentMeals.concat(addedMeals);
      this.nutritionService.$pickedLunchMeals.next(updatedMeals);
    } else if (this.mainMealName == 'dinner') {
      this.nutritionService.isDinnerAdded = true;
      const currentMeals = this.nutritionService.$pickedDinnerMeals.value;
      const updatedMeals = currentMeals.concat(addedMeals);
      this.nutritionService.$pickedDinnerMeals.next(updatedMeals);
    }

    this.nutritionService.addMeal({
      calories: this.pickedMealsValue.calories,
      carbs: this.pickedMealsValue.carbs,
      fats: this.pickedMealsValue.fats,
      protein: this.pickedMealsValue.protein,
      mealType: this.mainMealName,
      addedMeals: addedMeals
    });

    this.nutritionService.$totalMealsValue.next({
        totalProtein: this.nutritionService.$totalMealsValue.value.totalProtein + this.pickedMealsValue.protein,
        totalCarbs: this.nutritionService.$totalMealsValue.value.totalCarbs + this.pickedMealsValue.carbs,
        totalFats: this.nutritionService.$totalMealsValue.value.totalFats + this.pickedMealsValue.fats,
        totalCalories: this.nutritionService.$totalMealsValue.value.totalCalories + this.pickedMealsValue.calories,
      }
    );
  }

  removeMeal(index: number, type: string) {
    if (type == 'addMeal') {
      const meal = this.pickedMeals[index];

      if (this.mainMealName == 'breakfast') {
        this.nutritionService.$pickedBreakfastMealsValues.next({
          protein: this.nutritionService.$pickedBreakfastMealsValues.value.protein - meal.protein,
          carbs: this.nutritionService.$pickedBreakfastMealsValues.value.carbs - meal.carbs,
          fats: this.nutritionService.$pickedBreakfastMealsValues.value.fats - meal.fats,
          calories: this.nutritionService.$pickedBreakfastMealsValues.value.calories - meal.calories,
        });
        this.pickedMealsValue = { ...this.nutritionService.$pickedBreakfastMealsValues.value }
      } else if (this.mainMealName == 'lunch') {
        this.nutritionService.$pickedLunchMealsValues.next({
          protein: this.nutritionService.$pickedLunchMealsValues.value.protein - meal.protein,
          carbs: this.nutritionService.$pickedLunchMealsValues.value.carbs - meal.carbs,
          fats: this.nutritionService.$pickedLunchMealsValues.value.fats - meal.fats,
          calories: this.nutritionService.$pickedLunchMealsValues.value.calories - meal.calories,
        });
        this.pickedMealsValue = { ...this.nutritionService.$pickedLunchMealsValues.value }
      } else if (this.mainMealName == 'dinner') {
        this.nutritionService.$pickedDinnerMealsValues.next({
          protein: this.nutritionService.$pickedDinnerMealsValues.value.protein - meal.protein,
          carbs: this.nutritionService.$pickedDinnerMealsValues.value.carbs - meal.carbs,
          fats: this.nutritionService.$pickedDinnerMealsValues.value.fats - meal.fats,
          calories: this.nutritionService.$pickedDinnerMealsValues.value.calories - meal.calories,
        })
        this.pickedMealsValue = { ...this.nutritionService.$pickedDinnerMealsValues.value }
      }

      this.pickedMeals.splice(index, 1);
    } 
    else if (type == 'editMeal') {
      const meal = this.pickedMealsBeforeConfirm[index];

      if (this.mainMealName == 'breakfast') {
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedBreakfastBeforeConfirmValues.protein -= meal.protein,
          carbs: this.pickedBreakfastBeforeConfirmValues.carbs -= meal.carbs,
          fats: this.pickedBreakfastBeforeConfirmValues.fats -= meal.fats,
          calories: this.pickedBreakfastBeforeConfirmValues.calories -= meal.calories,
        };
      } 
      else if (this.mainMealName == 'lunch') {
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedLunchBeforeConfirmValues.protein -= meal.protein,
          carbs: this.pickedLunchBeforeConfirmValues.carbs -= meal.carbs,
          fats:this.pickedLunchBeforeConfirmValues.fats -= meal.fats,
          calories: this.pickedLunchBeforeConfirmValues.calories -= meal.calories,
        };
      } 
      else if (this.mainMealName == 'dinner') {
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedDinnerBeforeConfirmValues.protein -= meal.protein,
          carbs: this.pickedDinnerBeforeConfirmValues.carbs -= meal.carbs,
          fats: this.pickedDinnerBeforeConfirmValues.fats -= meal.fats,
          calories: this.pickedDinnerBeforeConfirmValues.calories -= meal.calories,
        };
      }

      this.pickedMealsBeforeConfirm.splice(index, 1);
    }
  }

  toggleEditMeal(mainMealName: string) {
    this.helperService.$dimBackground.next(true);
    this.pickedMealsBeforeConfirm = this.pickedMeals.slice();

    if (mainMealName == 'breakfast') {
      this.pickedBreakfastBeforeConfirmValues = { ...this.nutritionService.$pickedBreakfastMealsValues.value };
      this.pickedMeals = this.nutritionService.$pickedBreakfastMeals.value.slice();
      this.pickedMealsValue = { ...this.nutritionService.$pickedBreakfastMealsValues.value }
    } else if (mainMealName == 'lunch') {
      this.pickedLunchBeforeConfirmValues = { ...this.nutritionService.$pickedLunchMealsValues.value };
      this.pickedMeals = this.nutritionService.$pickedLunchMeals.value.slice();
      this.pickedMealsValue = { ...this.nutritionService.$pickedLunchMealsValues.value }
    } else if (mainMealName == 'dinner') {
      this.pickedDinnerBeforeConfirmValues = { ...this.nutritionService.$pickedDinnerMealsValues.value };
      this.pickedMeals = this.nutritionService.$pickedDinnerMeals.value.slice();
      this.pickedMealsValue = { ...this.nutritionService.$pickedDinnerMealsValues.value }
    }

    this.tempPickedMealsValue = this.pickedMealsValue;

    this.pickedMealsBeforeConfirm = this.pickedMeals.slice();
    this.pickedMealsBeforeConfirmValues = this.pickedMealsValue;

    if (this.mainMealName == mainMealName) {
      this.isEditMealVisible = !this.isEditMealVisible;
    } else {
      this.mainMealName = mainMealName;
      this.isEditMealVisible = true;
    }
  }

  confirmMeal() {
    this.helperService.$dimBackground.next(false);
    this.isEditMealVisible = false;

    this.pickedMeals = this.pickedMealsBeforeConfirm.slice();
    this.pickedMealsValue = { ...this.pickedMealsBeforeConfirmValues };

    if (this.mainMealName == 'breakfast') {
      if (this.pickedMealsBeforeConfirm.length == 0) {
        this.nutritionService.isBreakfastAdded = false;
        this.nutritionService.$pickedBreakfastMealsValues.next(this.pickedBreakfastBeforeConfirmValues);
      }
      this.nutritionService.$pickedBreakfastMeals.next(this.pickedMeals.slice());
      this.nutritionService.$pickedBreakfastMealsValues.next(this.pickedMealsValue);
    } else if (this.mainMealName == 'lunch') {
      if (this.pickedMealsBeforeConfirm.length == 0) {
        this.nutritionService.isLunchAdded = false;
        this.nutritionService.$pickedLunchMealsValues.next(this.pickedLunchBeforeConfirmValues);
      }
      this.nutritionService.$pickedLunchMeals.next(this.pickedMeals.slice());
      this.nutritionService.$pickedLunchMealsValues.next(this.pickedMealsValue);
    } else if (this.mainMealName == 'dinner') {
      if (this.pickedMealsBeforeConfirm.length == 0) {
        this.nutritionService.isDinnerAdded = false;
        this.nutritionService.$pickedDinnerMealsValues.next(this.pickedDinnerBeforeConfirmValues);
      }
      this.nutritionService.$pickedDinnerMeals.next(this.pickedMeals.slice());
      this.nutritionService.$pickedDinnerMealsValues.next(this.pickedMealsValue);
    }

    this.nutritionService.editMeal({
      calories: this.pickedMealsValue.calories,
      carbs: this.pickedMealsValue.carbs,
      fats: this.pickedMealsValue.fats,
      protein: this.pickedMealsValue.protein,
      mealType: this.mainMealName,
      addedMeals: this.pickedMeals.slice(),
    })

    this.nutritionService.$totalMealsValue.next({
      totalProtein: this.nutritionService.$totalMealsValue.value.totalProtein - this.tempPickedMealsValue.protein + this.pickedMealsValue.protein,
      totalFats: this.nutritionService.$totalMealsValue.value.totalFats - this.tempPickedMealsValue.fats + this.pickedMealsValue.fats,
      totalCarbs: this.nutritionService.$totalMealsValue.value.totalCarbs - this.tempPickedMealsValue.carbs + this.pickedMealsValue.carbs,
      totalCalories: this.nutritionService.$totalMealsValue.value.totalCalories - this.tempPickedMealsValue.calories + this.pickedMealsValue.calories,
    });
  }

  toggleAddWorkout(){
    this.helperService.$dimBackground.next(true);
    this.isAddWorkoutVisible = true;
  }

  toggleEditWorkout(){
    this.helperService.$dimBackground.next(true);
    this.isEditWorkoutVisible = true;
  }

  closeAddWorkout(){
    this.helperService.$dimBackground.next(false);
    this.isAddWorkoutVisible = false;
  }

  closeEditWorkout(){
    this.helperService.$dimBackground.next(false);
    this.isEditWorkoutVisible = false;
  }
  
  addWorkout(addWorkoutFormValue){
    this.checkDurationValues(addWorkoutFormValue);
    this.checkDurationLength(addWorkoutFormValue);

    if(this.workoutForm.valid){
      this.workoutService.isWorkoutAdded = true;

      this.workoutService.createWorkout({
          name: addWorkoutFormValue.name,
          type: addWorkoutFormValue.type,
          duration : addWorkoutFormValue.durationHrs + ':' + addWorkoutFormValue.durationMin + ':' + addWorkoutFormValue.durationSec,
          totalCalories : addWorkoutFormValue.totalCalories,
        }
      ).subscribe(res => {
        res.workoutType = this.checkWorkoutType(res);
        this.helperService.$dimBackground.next(false);
        this.isAddWorkoutVisible = false;
        
        this.workoutService.isWorkoutAdded = true;
        this.workoutService.$workoutValues.next(res);
  
        this.workoutForm.patchValue({
          name: res.name,
          type: res.workoutType,
          durationHrs: res.duration[0] + res.duration[1],
          durationMin: res.duration[3] + res.duration[4],
          durationSec: res.duration[6] + res.duration[7],
          totalCalories: res.totalCalories
        });
      });
    }

    
  }

  editWorkout(editWorkoutFormValue){
    this.checkDurationValues(editWorkoutFormValue);
    this.checkDurationLength(editWorkoutFormValue);

    if(this.workoutForm.valid){
      this.workoutService.updateWorkout({
        name: editWorkoutFormValue.name,
        type: editWorkoutFormValue.type,
        duration : editWorkoutFormValue.durationHrs + ':' + editWorkoutFormValue.durationMin + ':' + editWorkoutFormValue.durationSec,
        totalCalories : editWorkoutFormValue.totalCalories,
      }).subscribe(res => {
        res.workoutType = this.checkWorkoutType(res);
        this.helperService.$dimBackground.next(false);
        this.isEditWorkoutVisible = false;
  
        this.workoutService.isWorkoutAdded = true;
        this.workoutService.$workoutValues.next(res);
  
        this.workoutForm.patchValue({
          name: res.name,
          type: res.workoutType,
          durationHrs: res.duration[0] + res.duration[1],
          durationMin: res.duration[3] + res.duration[4],
          durationSec: res.duration[6] + res.duration[7],
          totalCalories: res.totalCalories
        });
      });
    }
  }

  deleteWorkout(){
    this.workoutForm.reset();
    this.workoutService.deleteWorkout();
    this.workoutService.isWorkoutAdded = false;
    this.isEditWorkoutVisible = false;
    this.workoutService.$workoutValues.next({name : '', type: '', duration: '', totalCalories: 0})
  }

  checkDurationLength(addWorkoutFormValue){
    if(addWorkoutFormValue.durationHrs == undefined || Number.isNaN(addWorkoutFormValue.durationHrs)){
      addWorkoutFormValue.durationHrs = '00'
    } 
    else if(addWorkoutFormValue.durationHrs.toString().length == 1){
      addWorkoutFormValue.durationHrs = '0' + addWorkoutFormValue.durationHrs;
    }

    if(addWorkoutFormValue.durationMin == undefined || Number.isNaN(addWorkoutFormValue.durationMin)){
      addWorkoutFormValue.durationMin = '00'
    } 
    else if(addWorkoutFormValue.durationMin.toString().length == 1){
      addWorkoutFormValue.durationMin = '0' + addWorkoutFormValue.durationMin;
    }

    if(addWorkoutFormValue.durationSec == undefined || Number.isNaN(addWorkoutFormValue.durationSec)){
      addWorkoutFormValue.durationSec = '00'
    } 
    else if(addWorkoutFormValue.durationSec.toString().length == 1){
      addWorkoutFormValue.durationSec = '0' + addWorkoutFormValue.durationSec;
    }
  }

  checkDurationValues(addWorkoutFormValue){
    if(addWorkoutFormValue.durationHrs < 0){
      addWorkoutFormValue.durationHrs = 0;
    }
    if(addWorkoutFormValue.durationMin < 0){
      addWorkoutFormValue.durationMin = 0;
    }
    if(addWorkoutFormValue.durationSec < 0){
      addWorkoutFormValue.durationSec = 0;
    }

    if(addWorkoutFormValue.durationHrs > 24){
      addWorkoutFormValue.durationHrs = 24;
    } 
    if(addWorkoutFormValue.durationMin > 60){
      addWorkoutFormValue.durationMin = 60;
    }
    if(addWorkoutFormValue.durationSec > 60){
      addWorkoutFormValue.durationSec = 60;
    }
  }

  getBackgroundColor(value: number, maxValue: number, color: string, meal : string): string {
    const opacity = Math.min(value / maxValue, 1);
    const rgbaColor = this.hexToRgba(color, opacity);
    return rgbaColor;
  }

  hexToRgba(hex: string, opacity: number): string {
    let r = 0, g = 0, b = 0;
    if (hex.length == 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
