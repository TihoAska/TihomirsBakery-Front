import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BACKEND_URL } from './tokens.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(
    @Inject(BACKEND_URL) private backendUrl: string,
    private http : HttpClient) { 

  }

  getAll() : Observable<any[]>{
    return this.http.get<any[]>(this.backendUrl + 'api/meal/Get');
  }
}
