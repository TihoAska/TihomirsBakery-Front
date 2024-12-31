import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';
import { BACKEND_URL } from './tokens.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private _isWorkoutAdded = false;

  public $workoutValues: BehaviorSubject<any> = new BehaviorSubject<any>({name : '', type: '', duration: '', totalCalories: 0});

  constructor(
    @Inject(BACKEND_URL) private backendUrl: string,
    private http : HttpClient,
    private accountService : AccountService) { 

  }

  setIsWorkoutAdded(value: boolean){
    this._isWorkoutAdded = value;
  }

  isWorkoutAdded(){
    return this._isWorkoutAdded;
  }

  public getWorkoutForTodayByUserId(userId){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessTokenTihomirsWorkshop')}`
    });
    
    return this.http.get<any>(this.backendUrl + 'api/Workout/GetWorkoutForTodayByUserId?userId=' + userId, { headers: headers });
  }

  public createWorkout(workout : Workout){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessTokenTihomirsWorkshop')}`
    });
    
    return this.http.post<any>(this.backendUrl + 'api/Workout/Create', workout, { headers: headers });
  }

  public updateWorkout(workout : Workout){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessTokenTihomirsWorkshop')}`
    });

    return this.http.put<any>(this.backendUrl + 'api/Workout/Update', workout, { headers: headers })
  }

  public deleteWorkout(){
    return this.http.delete(this.backendUrl + 'api/Workout/DeleteTodaysWorkoutByUserId?userId=' + this.accountService.$loggedUser.value.id).subscribe();
  }
}

export interface Workout{
  name : string,
  type : string,
  duration : string,
  totalCalories : number,
}
