import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourDayComponent } from './components/your-day/your-day.component';
import { AddWindowComponent } from './components/add-window/add-window.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { StreetWorkoutComponent } from './components/street-workout/street-workout.component';
import { GymEssentialsComponent } from './components/gym-essentials/gym-essentials.component';
import { KitchenEssentialsComponent } from './components/kitchen-essentials/kitchen-essentials.component';
import { UserSignedInGuard } from './guards/userSignedInGuard';
import { BreakfastIdeasComponent } from './components/breakfast-ideas/breakfast-ideas.component';
import { SnackIdeasComponent } from './components/snack-ideas/snack-ideas.component';
import { DinnerIdeasComponent } from './components/dinner-ideas/dinner-ideas.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'breakfast-ideas',
    component: BreakfastIdeasComponent,
  },
  {
    path: 'snack-ideas',
    component: SnackIdeasComponent,
  },
  {
    path: 'dinner-ideas',
    component: DinnerIdeasComponent,
  },
  {
    path: 'your-day',
    component: YourDayComponent,
    canActivate : [UserSignedInGuard],
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'street-workout',
    component: StreetWorkoutComponent
  },
  {
    path: 'gym-essentials',
    component: GymEssentialsComponent
  },
  {
    path: 'kitchen-essentials',
    component: KitchenEssentialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
