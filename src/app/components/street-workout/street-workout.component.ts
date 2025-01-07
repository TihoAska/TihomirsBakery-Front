import { Component } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-street-workout',
  templateUrl: './street-workout.component.html',
  styleUrl: './street-workout.component.scss'
})
export class StreetWorkoutComponent {
  constructor(public loadingService: LoadingService) {
     
  }

  ngOnInit(){
    window.scrollTo(0,0);
    this.showLoadingOverlay();
  }

  showLoadingOverlay(){
    this.loadingService.showStreetWorkoutLoadingOverlay();
  }

  ngOnDestroy(){
    this.loadingService.hideStreetWorkoutLoadingOverlay();
  }
}
