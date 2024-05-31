import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  public $dailyIntakeFromDb: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public $pickedBreakfastMeals: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public $pickedLunchMeals: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public $pickedDinnerMeals: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  public $pickedBreakfastMealsValues: BehaviorSubject<any> = new BehaviorSubject<any>({ protein: 0, fats: 0, carbs: 0, calories: 0 });
  public $pickedLunchMealsValues: BehaviorSubject<any> = new BehaviorSubject<any>({ protein: 0, fats: 0, carbs: 0, calories: 0 });
  public $pickedDinnerMealsValues: BehaviorSubject<any> = new BehaviorSubject<any>({ protein: 0, fats: 0, carbs: 0, calories: 0 });

  public isBreakfastAdded = false;
  public isLunchAdded = false;
  public isDinnerAdded = false;

  public $totalMealsValue: BehaviorSubject<any> = new BehaviorSubject<any>({ totalProtein: 0, totalFats: 0, totalCarbs: 0, totalCalories: 0 });

  constructor(
    public accountService : AccountService,
    private http : HttpClient) {

  }

  public addMeal(addMealRequest : mealRequest){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    
    this.http.post<any>('https://localhost:7069/api/nutrition/AddMeal', addMealRequest, { headers: headers }).subscribe();
  }

  public editMeal(editMealRequest : mealRequest){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    this.http.put<any>('https://localhost:7069/api/nutrition/EditMeal', editMealRequest, { headers: headers }).subscribe();
  }

  public getDailyIntakeForTodayByUserId(userId : number){
    return this.http.get<any>('https://localhost:7069/api/nutrition/GetDailyIntakeForTodayByUserId?userId=' + userId);
  }

  getDataForUser(){
    this.getDailyIntakeForTodayByUserId(this.accountService.$loggedUser.value.id).subscribe(res => {
      if(res){
        this.$dailyIntakeFromDb.next(res);

        this.$totalMealsValue.next({
            totalCalories: res.totalCalories,
            totalFats: res.totalFats,
            totalCarbs: res.totalCarbs,
            totalProtein: res.totalProtein,
          }
        );

        // this.$pickedBreakfastMeals.next([]);
        // this.$pickedLunchMeals.next([]);
        // this.$pickedDinnerMeals.next([]);
  
        this.$dailyIntakeFromDb.value.mealIntakes.forEach(element => {
  
          if(element.mealType == 0){
            this.isBreakfastAdded = true;
            this.$pickedBreakfastMeals.next(element.addedMeals);
            this.$pickedBreakfastMealsValues.next({
              calories: element.calories,
              carbs: element.carbs,
              fats: element.fats,
              protein: element.protein,
            });
          } else if (element.mealType == 1){
            this.isLunchAdded = true;
            this.$pickedLunchMeals.next(element.addedMeals);
            this.$pickedLunchMealsValues.next({
              calories: element.calories,
              carbs: element.carbs,
              fats: element.fats,
              protein: element.protein,
            });
          } else if (element.mealType == 2){
            this.isDinnerAdded = true;
            this.$pickedDinnerMeals.next(element.addedMeals);
            this.$pickedDinnerMealsValues.next({
              calories: element.calories,
              carbs: element.carbs,
              fats: element.fats,
              protein: element.protein,
            });
          }
        });
      } else {
        this.$totalMealsValue.next({
          totalCalories: 0,
          totalFats: 0,
          totalCarbs: 0,
          totalProtein: 0,
        });
        this.$pickedBreakfastMealsValues.next({
          calories: 0,
          carbs: 0,
          protein: 0,
          fats: 0,
        });
        this.$pickedLunchMealsValues.next({
          calories: 0,
          carbs: 0,
          protein: 0,
          fats: 0,
        });
        this.$pickedDinnerMealsValues.next({
          calories: 0,
          carbs: 0,
          protein: 0,
          fats: 0,
        });
        this.isBreakfastAdded = false;
        this.isLunchAdded = false;
        this.isDinnerAdded = false;
      }
    });
  }

}

export interface mealRequest {
  mealType : string,
  calories : number,
  protein : number, 
  carbs : number,
  fats : number,
  addedMeals : addedMeal[],
}

export interface addedMeal {
  name : string;
  calories : number,
  protein : number, 
  carbs : number,
  fats : number,
}

