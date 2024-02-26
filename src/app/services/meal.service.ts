import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  allMeals : BehaviorSubject<any> = new BehaviorSubject([]);

  public mealFormValues : BehaviorSubject<any> = new BehaviorSubject({
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  });

  public totalValues: BehaviorSubject<any> = new BehaviorSubject({
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0
  });

  constructor(private http : HttpClient) { }

  getAll() : Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7069/api/meal/Get');
  }
}
