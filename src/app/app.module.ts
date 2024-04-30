import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { YourDayComponent } from './components/your-day/your-day.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AddWindowComponent } from './components/add-window/add-window.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { StreetWorkoutComponent } from './components/street-workout/street-workout.component';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { GymEssentialsComponent } from './components/gym-essentials/gym-essentials.component';
import { HamburgerSidebarComponent } from './components/hamburger-sidebar/hamburger-sidebar.component';
import { KitchenEssentialsComponent } from './components/kitchen-essentials/kitchen-essentials.component';
import { LoginComponent } from './components/login/login.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { RegisterComponent } from './components/register/register.component';
import { AvatarPickerComponent } from './components/avatar-picker/avatar-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    YourDayComponent,
    SidebarComponent,
    FooterComponent,
    AddWindowComponent,
    MapComponent,
    HomeComponent,
    StreetWorkoutComponent,
    GymEssentialsComponent,
    HamburgerSidebarComponent,
    KitchenEssentialsComponent,
    LoginComponent,
    RegisterComponent,
    AvatarPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule.forRoot(),
    NgApexchartsModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    DragScrollComponent,
    DragScrollItemDirective,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
