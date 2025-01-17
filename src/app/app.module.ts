import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YourDayComponent } from './components/your-day/your-day.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { StreetWorkoutComponent } from './components/street-workout/street-workout.component';
import { GymEssentialsComponent } from './components/gym-essentials/gym-essentials.component';
import { HamburgerSidebarComponent } from './components/hamburger-sidebar/hamburger-sidebar.component';
import { KitchenEssentialsComponent } from './components/kitchen-essentials/kitchen-essentials.component';
import { LoginComponent } from './components/login/login.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { RegisterComponent } from './components/register/register.component';
import { AvatarPickerComponent } from './components/avatar-picker/avatar-picker.component';
import { YourProfileComponent } from './components/your-profile/your-profile.component';
import { BreakfastIdeasComponent } from './components/breakfast-ideas/breakfast-ideas.component';
import { LunchIdeasComponent } from './components/lunch-ideas/lunch-ideas.component';
import { SnackIdeasComponent } from './components/snack-ideas/snack-ideas.component';
import { DinnerIdeasComponent } from './components/dinner-ideas/dinner-ideas.component';
import { GymComponent } from './components/gym/gym.component';
import { BACKEND_URL, MAP_API_KEY } from './services/tokens.service';
import { environment } from '../environments/environment';
import { tokenInterceptor } from './auth/token.interceptor';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    YourDayComponent,
    SidebarComponent,
    MapComponent,
    HomeComponent,
    StreetWorkoutComponent,
    GymEssentialsComponent,
    HamburgerSidebarComponent,
    KitchenEssentialsComponent,
    LoginComponent,
    RegisterComponent,
    AvatarPickerComponent,
    YourProfileComponent,
    BreakfastIdeasComponent,
    LunchIdeasComponent,
    SnackIdeasComponent,
    DinnerIdeasComponent,
    GymComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    { provide: BACKEND_URL, useValue: environment.backendUrl },
    { provide: MAP_API_KEY, useValue: environment.mapApiKey },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
