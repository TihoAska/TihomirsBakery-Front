import { Component } from '@angular/core';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.scss'
})
export class GymComponent {

  intervalId;
  displayLoadingOverlay = true;
  videosLoadedCounter = 0;
  loadingTextIndex = 1;
  loadingText = 'loading...';
  loadingTexts = ['loading...', 'warming up...', 'doing pushups...', 'bench pressing...', 'bar stuck...', 'help pls...'];

  constructor() {
  
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }

  onVideoLoad(){
    this.videosLoadedCounter++;

    if (this.videosLoadedCounter >= 12) {
      this.displayLoadingOverlay = false;
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
