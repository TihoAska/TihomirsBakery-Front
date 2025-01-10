import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LoadingComponent } from '../../shared/loading.component';

@Component({
  selector: 'app-street-workout',
  templateUrl: './street-workout.component.html',
  styleUrl: './street-workout.component.scss'
})
export class StreetWorkoutComponent extends LoadingComponent {
  constructor(public sidebarService: SidebarService) {
    super();
    this.setLoadingTexts(['loading...', 'rotating joints...', 'preparing chalk...', 'spraining ankles...', 'tearing muscles...', 'call an ambulance...']);
  }

  ngOnInit(){
    window.scrollTo(0,0);
    this.startLoadingTextRotation();
  }

  onVideoLoad(){
    this.onVideosLoaded(12);
  }
}
