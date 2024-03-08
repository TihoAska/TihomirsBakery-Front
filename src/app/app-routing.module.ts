import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourDayComponent } from './components/your-day/your-day.component';
import { AddWindowComponent } from './components/add-window/add-window.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { StreetWorkoutComponent } from './components/street-workout/street-workout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'your-day',
    component: YourDayComponent,
    children: [
      {
        path: 'add',
        component: AddWindowComponent,
        children: [
          {
            path: 'meal',
            component: AddWindowComponent,
          },
          {
            path: 'workout',
            component: AddWindowComponent,
          }
        ]
      }
    ]
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'street-workout',
    component: StreetWorkoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
