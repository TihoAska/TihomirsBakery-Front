import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-street-workout',
  templateUrl: './street-workout.component.html',
  styleUrl: './street-workout.component.scss'
})
export class StreetWorkoutComponent {
  intervalId;
  displayLoadingOverlay = true;
  videosLoadedCounter = 0;
  loadingTextIndex = 1;
  loadingText = 'loading...';
  loadingTexts = ['loading...', 'rotating joints...', 'preparing chalk...', 'spraining ankles...', 'tearing muscles...', 'call an ambulance...'];

  constructor(public sidebarService: SidebarService) {
     
  }

  ngOnInit(){
    window.scrollTo(0,0);
    this.startLoadingTextRotation();
  }

  onVideoLoad(){
    this.videosLoadedCounter++;

    if (this.videosLoadedCounter >= 12) {
      this.displayLoadingOverlay = false;
      this.stopTextRotation();
    }
  }

  startLoadingTextRotation(){
    this.intervalId = setInterval(() => {
      this.changeLoadingText(this.loadingTexts[this.loadingTextIndex]);
      this.loadingTextIndex++;
      if(this.loadingTextIndex >= this.loadingTexts.length){
        this.loadingTextIndex = 0;
      }
    }, 5000);
  }

  changeLoadingText(loadingText){
    this.loadingText = loadingText;
  }

  stopTextRotation(){
    if(this.intervalId){
      this.loadingTextIndex = 0;
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
