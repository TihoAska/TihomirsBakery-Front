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

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-your-day',
  templateUrl: './your-day.component.html',
  styleUrl: './your-day.component.scss'
})
export class YourDayComponent {

  images = [
    { path: '../../../assets/your-day-kitchen.jpg', name: 'KITCHEN-BACKGROUND'},
  ]

  searchControl = new FormControl();
  allMeals: any[] = [];
  filteredMeals: any[] = [];

  isAddMealVisible = false;
  showQuery = true;

  mainMealName = "";

  addedMealsValues = {
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  }

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService, 
    private router : Router,
    public mealService : MealService) {
  }

  ngOnInit(){
    this.mealService.getAll().subscribe(data => {
      this.mealService.allMeals.next(data);
      this.allMeals = data;
    })
    this.searchControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(query => {
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
    if(this.mainMealName == mainMealName){
      this.isAddMealVisible = !this.isAddMealVisible;
    } else{
      this.mainMealName = mainMealName;
      this.isAddMealVisible = true;
    }
  }

  closeAddMeal(){
    this.isAddMealVisible = false;
    this.addedMealsValues = {
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0
    }
  }

  addMeal(meal : any){
    this.showQuery = false;
    this.addedMealsValues = {
      protein: this.addedMealsValues.protein + meal.proteins,
      carbs: this.addedMealsValues.carbs + meal.carbs,
      fats: this.addedMealsValues.fats + meal.fats,
      calories: this.addedMealsValues.calories + meal.calories,
    }
  }
}
