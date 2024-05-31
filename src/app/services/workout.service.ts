import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  public $workoutValues: BehaviorSubject<any> = new BehaviorSubject<any>({name : '', type: '', duration: '', totalCalories: 0});

  public isWorkoutAdded = false;

  constructor(
    private http : HttpClient,
    private accountService : AccountService,
  ) { }

  public getWorkoutForTodayByUserId(userId){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    
    return this.http.get<any>('https://localhost:7069/api/Workout/GetWorkoutForTodayByUserId?userId=' + userId, { headers: headers });
  }

  public createWorkout(workout : Workout){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    
    return this.http.post<any>('https://localhost:7069/api/Workout/Create', workout, { headers: headers });
  }

  public updateWorkout(workout : Workout){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.put<any>('https://localhost:7069/api/Workout/Update', workout, { headers: headers })
  }

  public deleteWorkout(){
    return this.http.delete('https://localhost:7069/api/Workout/DeleteTodaysWorkoutByUserId?userId=' + this.accountService.$loggedUser.value.id).subscribe();
  }
}

export interface Workout{
  name : string,
  type : string,
  duration : string,
  totalCalories : number,
}
