import { Component } from '@angular/core';

@Component({
  selector: 'app-street-workout',
  templateUrl: './street-workout.component.html',
  styleUrl: './street-workout.component.scss'
})
export class StreetWorkoutComponent {
  ngOnInit(){
    window.scrollTo(0,0);
  }
}
