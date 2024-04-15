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

  isAddMealVisible = false;
  showQuery = true;
  isFoodPicked = false;

  mainMealName = "";

  pickedMealsValue = {
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
      console.log(this.filteredMeals);
    }
  }

  toggleAddMeal(mainMealName : string){
    this.helperService.dimBackground.next(true);
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

    this.pickedMealsValue = {
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0
    }
  }

  pickMeal(meal : any){
    this.showQuery = false;
    this.isFoodPicked = true;
    this.pickedMeals.push(meal);

    this.pickedMealsValue = {
      protein: this.pickedMealsValue.protein + meal.proteins,
      carbs: this.pickedMealsValue.carbs + meal.carbs,
      fats: this.pickedMealsValue.fats + meal.fats,
      calories: this.pickedMealsValue.calories + meal.calories,
    }
  }

  addMeal(){
    this.helperService.dimBackground.next(false);
    this.isAddMealVisible = false;

    this.totalMealsValue = {
      protein: this.totalMealsValue.protein + this.pickedMealsValue.protein,
      carbs: this.totalMealsValue.carbs + this.pickedMealsValue.carbs, 
      fats: this.totalMealsValue.fats + this.pickedMealsValue.fats, 
      calories: this.totalMealsValue.calories + this.pickedMealsValue.calories, 
    }
  }
}
