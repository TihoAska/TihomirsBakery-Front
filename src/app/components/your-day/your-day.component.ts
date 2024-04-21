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
import { FormControl } from '@angular/forms';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
      state('in', style({opacity: 1, transform: 'scale(1)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'scale(0.5)'}),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.3s ease-out', style({opacity: 0, transform: 'scale(0.5)'}))
      ])
    ])
  ]
})
export class YourDayComponent {

  images = [
    { path: '../../../assets/your-day-kitchen.jpg', name: 'KITCHEN-BACKGROUND'},
  ]

  searchControl = new FormControl();

  allMeals: any[] = [];
  filteredMeals: any[] = [];
  pickedMeals: any[] = [];

  pickedBreakfastMeals : any[] = [];
  pickedLunchMeals : any[] = [];
  pickedDinnerMeals : any[] = [];
  tempPickedMeals : any[] = [];

  tempBreakfastMeals : any[] = [];
  tempLunchMeals : any[] = [];
  tempDinnerMeals : any[] = [];
  pickedMealsBeforeConfirm : any[] = [];

  isAddMealVisible = false;
  isEditMealVisible = false;
  showQuery = true;
  isFoodPicked = false;
  isBreakfastAdded = false;
  isLunchAdded = false;
  isDinnerAdded = false;

  mainMealName = "";

  pickedMealsValue = {
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  }

  tempRemovedMealsValue = { protein: 0, fats: 0, carbs: 0, calories: 0}

  tempPickedMealsValue = {
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  }

  pickedMealsBeforeConfirmValues = {
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  }

  pickedBreakfastMealsValue = {
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  }

  pickedLunchMealsValue = {
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  }

  pickedDinnerMealsValue = {
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  }

  totalMealsValue = {
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  }

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService, 
    public mealService : MealService) {
  }

  ngOnInit(){
    this.mealService.getAll().subscribe(data => {
      this.mealService.allMeals.next(data);
      this.allMeals = data;
    })
    this.searchControl.valueChanges.pipe(distinctUntilChanged()).subscribe(query => {
      this.filterMeals(query);
    });
  }

  filterMeals(query: string) {
    this.showQuery = true;
    if (!query.trim()) {
      this.filteredMeals = [];
    } else {
      this.filteredMeals = this.allMeals.filter(meal =>
        meal.name.toLowerCase().includes(query.toLowerCase())
      );
      // console.log(this.filteredMeals);
    }
  }

  toggleAddMeal(mainMealName : string){
    this.helperService.dimBackground.next(true);

    if(mainMealName == "breakfast"){
      this.pickedMeals = this.pickedBreakfastMeals;
      this.pickedMealsValue = this.pickedBreakfastMealsValue;
    } else if (mainMealName == "lunch"){
      this.pickedMeals = this.pickedLunchMeals;
      this.pickedMealsValue = this.pickedLunchMealsValue;
    } else if (mainMealName == "dinner"){
      this.pickedMeals = this.pickedDinnerMeals;
      this.pickedMealsValue = this.pickedDinnerMealsValue;
    }

    if(this.mainMealName == mainMealName){
      this.isAddMealVisible = !this.isAddMealVisible;
    } else{
      this.mainMealName = mainMealName;
      this.isAddMealVisible = true;
    }
  }

  closeAddMeal(){
    this.helperService.dimBackground.next(false);
    this.isAddMealVisible = false;
    this.isFoodPicked = false;

    if(this.mainMealName == "breakfast"){
      this.pickedBreakfastMealsValue = {
        protein: 0,
        fats: 0,
        carbs: 0,
        calories: 0
      }
      this.pickedBreakfastMeals = [];
      this.pickedMeals = [];
      this.pickedMealsValue = this.pickedBreakfastMealsValue;
    } 
    else if (this.mainMealName == "lunch"){
      this.pickedLunchMealsValue = {
        protein: 0,
        fats: 0,
        carbs: 0,
        calories: 0
      }
      this.pickedLunchMeals = [];
      this.pickedMeals = [];
      this.pickedMealsValue = this.pickedLunchMealsValue;
    } 
    else if (this.mainMealName == "dinner"){
      this.pickedDinnerMealsValue = {
        protein: 0,
        fats: 0,
        carbs: 0,
        calories: 0
      }
      this.pickedDinnerMeals = [];
      this.pickedMeals = [];
      this.pickedMealsValue = this.pickedDinnerMealsValue;
    }
  }

  closeEditMeal(){
    this.helperService.dimBackground.next(false);
    this.isEditMealVisible = false;
  }

  pickMeal(meal : any){
    this.showQuery = false;
    this.isFoodPicked = true;
    this.pickedMeals.push(meal);

    if(this.mainMealName == "breakfast"){
      this.pickedBreakfastMealsValue = {
        protein: this.pickedBreakfastMealsValue.protein + meal.proteins,
        carbs: this.pickedBreakfastMealsValue.carbs + meal.carbs,
        fats: this.pickedBreakfastMealsValue.fats + meal.fats,
        calories: this.pickedBreakfastMealsValue.calories + meal.calories,
      }
      this.pickedMealsValue = this.pickedBreakfastMealsValue;
    } 
    else if(this.mainMealName == "lunch"){
      this.pickedLunchMealsValue = {
        protein: this.pickedLunchMealsValue.protein + meal.proteins,
        carbs: this.pickedLunchMealsValue.carbs + meal.carbs,
        fats: this.pickedLunchMealsValue.fats + meal.fats,
        calories: this.pickedLunchMealsValue.calories + meal.calories,
      }
      this.pickedMealsValue = this.pickedLunchMealsValue;
    } 
    else if(this.mainMealName == "dinner"){
      this.pickedDinnerMealsValue = {
        protein: this.pickedDinnerMealsValue.protein + meal.proteins,
        carbs: this.pickedDinnerMealsValue.carbs + meal.carbs,
        fats: this.pickedDinnerMealsValue.fats + meal.fats,
        calories: this.pickedDinnerMealsValue.calories + meal.calories,
      }
      this.pickedMealsValue = this.pickedDinnerMealsValue;
    } 
  }

  addMeal(){
    this.helperService.dimBackground.next(false);
    this.isAddMealVisible = false;
    this.isFoodPicked = false;

    if(this.mainMealName == "breakfast"){
      this.isBreakfastAdded = true;
    } 
    else if (this.mainMealName == "lunch"){
      this.isLunchAdded = true;
    } 
    else if (this.mainMealName == "dinner"){
      this.isDinnerAdded = true;
    }

    this.totalMealsValue = {
      protein: this.totalMealsValue.protein + this.pickedMealsValue.protein,
      carbs: this.totalMealsValue.carbs + this.pickedMealsValue.carbs, 
      fats: this.totalMealsValue.fats + this.pickedMealsValue.fats, 
      calories: this.totalMealsValue.calories + this.pickedMealsValue.calories, 
    }
  }

  removeMeal(index : number, type : string){
    if(type == 'addMeal'){
      const meal = this.pickedMeals[index];

      if(this.mainMealName == "breakfast"){
        this.pickedBreakfastMealsValue = {
          protein: this.pickedBreakfastMealsValue.protein - meal.proteins,
          carbs: this.pickedBreakfastMealsValue.carbs - meal.carbs,
          fats: this.pickedBreakfastMealsValue.fats - meal.fats,
          calories: this.pickedBreakfastMealsValue.calories - meal.calories,
        }
        this.pickedMealsValue = this.pickedBreakfastMealsValue;
      } 
      else if(this.mainMealName == "lunch"){
        this.pickedLunchMealsValue = {
          protein: this.pickedLunchMealsValue.protein - meal.proteins,
          carbs: this.pickedLunchMealsValue.carbs - meal.carbs,
          fats: this.pickedLunchMealsValue.fats - meal.fats,
          calories: this.pickedLunchMealsValue.calories - meal.calories,
        }
        this.pickedMealsValue = this.pickedLunchMealsValue;
      } 
      else if(this.mainMealName == "dinner"){
        this.pickedDinnerMealsValue = {
          protein: this.pickedDinnerMealsValue.protein - meal.proteins,
          carbs: this.pickedDinnerMealsValue.carbs - meal.carbs,
          fats: this.pickedDinnerMealsValue.fats - meal.fats,
          calories: this.pickedDinnerMealsValue.calories - meal.calories,
        }
        this.pickedMealsValue = this.pickedDinnerMealsValue;
      } 
  
      this.pickedMeals.splice(index, 1);
    } 
    else if (type == 'editMeal'){
      const meal = this.pickedMealsBeforeConfirm[index];

      this.pickedMealsBeforeConfirmValues = this.tempRemovedMealsValue;


      if(this.mainMealName == "breakfast"){
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedMealsBeforeConfirmValues.protein - meal.proteins,
          fats: this.pickedMealsBeforeConfirmValues.fats - meal.fats,
          carbs: this.pickedMealsBeforeConfirmValues.carbs - meal.carbs,
          calories: this.pickedMealsBeforeConfirmValues.calories - meal.calories,
        }
        this.tempRemovedMealsValue = {
          protein: this.tempRemovedMealsValue.protein - meal.proteins,
          fats: this.tempRemovedMealsValue.fats - meal.fats,
          carbs: this.tempRemovedMealsValue.carbs - meal.carbs,
          calories: this.tempRemovedMealsValue.calories - meal.calories,
        }
      } 
      else if(this.mainMealName == "lunch"){
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedMealsBeforeConfirmValues.protein - meal.proteins,
          fats: this.pickedMealsBeforeConfirmValues.fats - meal.fats,
          carbs: this.pickedMealsBeforeConfirmValues.carbs - meal.carbs,
          calories: this.pickedMealsBeforeConfirmValues.calories - meal.calories,
        }
        this.tempRemovedMealsValue = {
          protein: this.tempRemovedMealsValue.protein - meal.proteins,
          fats: this.tempRemovedMealsValue.fats - meal.fats,
          carbs: this.tempRemovedMealsValue.carbs - meal.carbs,
          calories: this.tempRemovedMealsValue.calories - meal.calories,
        }
      } 
      else if(this.mainMealName == "dinner"){
        this.pickedMealsBeforeConfirmValues = {
          protein: this.pickedMealsBeforeConfirmValues.protein - meal.proteins,
          fats: this.pickedMealsBeforeConfirmValues.fats - meal.fats,
          carbs: this.pickedMealsBeforeConfirmValues.carbs - meal.carbs,
          calories: this.pickedMealsBeforeConfirmValues.calories - meal.calories,
        }
        this.tempRemovedMealsValue = {
          protein: this.tempRemovedMealsValue.protein - meal.proteins,
          fats: this.tempRemovedMealsValue.fats - meal.fats,
          carbs: this.tempRemovedMealsValue.carbs - meal.carbs,
          calories: this.tempRemovedMealsValue.calories - meal.calories,
        }
      } 

      this.pickedMealsBeforeConfirm.splice(index, 1);
    }

    console.log("Before confirm: ");
    console.log(this.pickedMealsBeforeConfirm);

    console.log("Picked meals: ");
    console.log(this.pickedMeals);
  }

  toggleEditMeal(mainMealName : string){
    this.helperService.dimBackground.next(true);
    this.tempRemovedMealsValue = this.pickedMealsValue;
    this.pickedMealsBeforeConfirm = this.pickedMeals.slice();

    if(mainMealName == "breakfast"){
      this.pickedMeals = this.pickedBreakfastMeals;
      this.pickedMealsValue = this.pickedBreakfastMealsValue;
    } else if (mainMealName == "lunch"){
      this.pickedMeals = this.pickedLunchMeals;
      this.pickedMealsValue = this.pickedLunchMealsValue;
    } else if (mainMealName == "dinner"){
      this.pickedMeals = this.pickedDinnerMeals;
      this.pickedMealsValue = this.pickedDinnerMealsValue;
    }

    this.tempPickedMeals = this.pickedMeals;
    this.tempPickedMealsValue = this.pickedMealsValue;

    this.pickedMealsBeforeConfirm = this.pickedMeals.slice();
    this.pickedMealsBeforeConfirmValues = this.pickedMealsValue;

    if(this.mainMealName == mainMealName){
      this.isEditMealVisible = !this.isEditMealVisible;
    } else{
      this.mainMealName = mainMealName;
      this.isEditMealVisible = true;
    }
  }

  confirmMeal(){
    this.helperService.dimBackground.next(false);
    this.isEditMealVisible = false;

    this.pickedMeals = this.pickedMealsBeforeConfirm;
    this.pickedMealsValue = this.pickedMealsBeforeConfirmValues;

    if(this.mainMealName == "breakfast"){
      if(this.pickedBreakfastMeals.length == 0){
        this.isBreakfastAdded = false;
      }
      this.pickedBreakfastMeals = this.pickedMeals;
      this.pickedBreakfastMealsValue = this.pickedMealsValue;
    } else if (this.mainMealName == "lunch"){
      if(this.pickedLunchMeals.length == 0){
        this.isLunchAdded = false;
      }
      this.pickedLunchMeals = this.pickedMeals;
      this.pickedLunchMealsValue = this.pickedMealsValue;
    } else if (this.mainMealName == "dinner"){
      if(this.pickedDinnerMeals.length == 0){
        this.isDinnerAdded = false;
      }
      this.pickedDinnerMeals = this.pickedMeals;
      this.pickedDinnerMealsValue = this.pickedMealsValue;
    }

    this.totalMealsValue = {
      protein: this.totalMealsValue.protein - this.tempPickedMealsValue.protein + this.pickedMealsValue.protein,
      fats: this.totalMealsValue.fats - this.tempPickedMealsValue.fats + this.pickedMealsValue.fats,
      carbs: this.totalMealsValue.carbs - this.tempPickedMealsValue.carbs + this.pickedMealsValue.carbs,
      calories: this.totalMealsValue.calories - this.tempPickedMealsValue.calories + this.pickedMealsValue.calories,
    }
  }
}
