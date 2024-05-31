import { addedMeal } from './../../services/nutrition.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApexDataLabels, ApexFill, ApexLegend, ApexMarkers, ApexOptions, ApexPlotOptions, ApexTooltip, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { BehaviorSubject, debounceTime, distinctUntilChanged, interval, take } from 'rxjs';
import { FooterService } from '../../services/footer.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { MealService } from '../../services/meal.service';
import { FormControl, Validators } from '@angular/forms';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NutritionService } from '../../services/nutrition.service';
import { AccountService } from '../../services/account.service';
import { SidebarService } from '../../services/sidebar.service';

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
  
  constructor(
    public footerService: FooterService,
    public helperService: HelperService,
    public mealService: MealService,
    public nutritionService : NutritionService,
    public accountService : AccountService,
    public sidebarService : SidebarService
  ) {}

  ngOnInit() {
    window.scrollTo(0,0);

    this.mealService.getAll().subscribe((data) => {
      this.mealService.allMeals.next(data);
      this.allMeals = data;
    });
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((query) => {
        this.filterMeals(query);
    });

    console.log("DailyIntakeFromDb: ");
    console.log(this.nutritionService.$dailyIntakeFromDb.value);
  }

  filterMeals(query: string) {
    this.showQuery = true;
    if (!query.trim()) {
      this.filteredMeals = [];
    } else {
      this.filteredMeals = this.allMeals.filter((meal) =>
        meal.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log(this.filteredMeals);
    }
  }

  toggleAddMeal(mainMealName: string) {
    this.helperService.dimBackground.next(true);

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
    
    console.log("Picked meals before confirm: ");
    console.log(this.pickedMealsBeforeConfirm);

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

    console.log("Breakfast: " + this.nutritionService.isBreakfastAdded + " Lunch: " + this.nutritionService.isLunchAdded + " Dinner: " + this.nutritionService.isDinnerAdded);

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
    console.log("Picked meals before confirm in toggle");
    console.log(this.pickedMealsBeforeConfirm);
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
