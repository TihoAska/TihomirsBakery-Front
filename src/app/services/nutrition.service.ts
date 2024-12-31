import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';
import { WorkoutService } from './workout.service';
import { BACKEND_URL } from './tokens.service';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private _isBreakfastAdded = false;
  private _isLunchAdded = false;
  private _isDinnerAdded = false;

  public $pickedBreakfastMeals: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public $pickedLunchMeals: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public $pickedDinnerMeals: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  public $pickedBreakfastMealsValues: BehaviorSubject<any> = new BehaviorSubject<any>({ protein: 0, fats: 0, carbs: 0, calories: 0 });
  public $pickedLunchMealsValues: BehaviorSubject<any> = new BehaviorSubject<any>({ protein: 0, fats: 0, carbs: 0, calories: 0 });
  public $pickedDinnerMealsValues: BehaviorSubject<any> = new BehaviorSubject<any>({ protein: 0, fats: 0, carbs: 0, calories: 0 });

  public $totalMealsValue: BehaviorSubject<any> = new BehaviorSubject<any>({ totalProtein: 0, totalFats: 0, totalCarbs: 0, totalCalories: 0 });

  constructor(
    @Inject(BACKEND_URL) private backendUrl: string,
    public accountService : AccountService,
    public workoutService : WorkoutService,
    private http : HttpClient) {

  }

  setIsBreakfastAdded(value: boolean){
    this._isBreakfastAdded = value;
  }

  isBreakfastAdded(){
    return this._isBreakfastAdded;
  }

  setIsLunchAdded(value: boolean){
    this._isLunchAdded = value;
  }

  isLunchAdded(){
    return this._isLunchAdded;
  }

  setIsDinnerAdded(value: boolean){
    this._isDinnerAdded = value;
  }

  isDinnerAdded(){
    return this._isDinnerAdded;
  }

  public addMeal(addMealRequest : mealRequest){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessTokenTihomirsWorkshop')}`
    });
    
    return this.http.post<any>(this.backendUrl + 'api/nutrition/AddMeal', addMealRequest, { headers: headers });
  }

  public editMeal(editMealRequest : mealRequest){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessTokenTihomirsWorkshop')}`
    });

    return this.http.put<any>(this.backendUrl + 'api/nutrition/EditMeal', editMealRequest, { headers: headers });
  }

  public getDailyIntakeForTodayByUserId(userId : number){
    return this.http.get<any>(this.backendUrl + 'api/nutrition/GetDailyIntakeForTodayByUserId?userId=' + userId);
  }

  public getDataForUser(){
    this.getDailyIntakeForTodayByUserId(this.accountService.$loggedUser.value.id).subscribe(res => {
      if(res){
        this.$totalMealsValue.next({
            totalCalories: res.totalCalories,
            totalFats: res.totalFats,
            totalCarbs: res.totalCarbs,
            totalProtein: res.totalProtein,
          }
        );
  
        res.mealIntakes.forEach(element => {
          if(element.mealType == 0){
            this.setIsBreakfastAdded(true);
            this.$pickedBreakfastMeals.next(element.addedMeals);
            this.$pickedBreakfastMealsValues.next({
              calories: element.calories,
              carbs: element.carbs,
              fats: element.fats,
              protein: element.protein,
            });
          } else if (element.mealType == 1){
            this.setIsLunchAdded(true);
            this.$pickedLunchMeals.next(element.addedMeals);
            this.$pickedLunchMealsValues.next({
              calories: element.calories,
              carbs: element.carbs,
              fats: element.fats,
              protein: element.protein,
            });
          } else if (element.mealType == 2){
            this.setIsDinnerAdded(true);
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
        this.setIsBreakfastAdded(false);
        this.setIsLunchAdded(false);
        this.setIsDinnerAdded(false);
      }
    });

    this.workoutService.getWorkoutForTodayByUserId(this.accountService.$loggedUser.value.id).subscribe(res => {
      if(res){
        this.workoutService.$workoutValues.next({
          name: res.name,
          type: res.workoutType,
          duration: res.duration,
          totalCalories: res.totalCalories,
        });

        this.workoutService.setIsWorkoutAdded(true);
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