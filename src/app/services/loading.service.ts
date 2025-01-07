import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _displayLoadingOverlay = false;
  private _loadingText = 'loading...'
  private _loadingTextIndex = 1;
  private _intervalId;
  private _displayStreetWorkoutLoadingOverlay = false;
  private _displayGymLoadingOverlay = false;
  private _gymVideosLoadedCoutner = 0;
  private _streetWorkoutVideosLoadedCounter = 0;

  streetWorkoutLoadingTexts = ['loading...', 'rotating joints...', 'preparing chalk...', 'spraining ankles...', 'tearing muscles...', 'call an ambulance...'];
  gymLoadingTexts = ['loading...', 'warming up...', 'doing pushups...', 'bench pressing...', 'bar stuck...', 'help pls...'];

  constructor() { }

  loadGymVideo(){
    this._gymVideosLoadedCoutner++;

    if (this._gymVideosLoadedCoutner >= 10) {
      this.hideGymLoadingOverlay();
    }
  }

  loadStreetWorkoutVideo(){
    this._streetWorkoutVideosLoadedCounter++;

    if (this._streetWorkoutVideosLoadedCounter >= 10) {
      this.hideStreetWorkoutLoadingOverlay();
    }
  }
  
  getLoadingText(){
    return this._loadingText;
  }

  changeLoadingText(loadingText){
    this._loadingText = loadingText;
  }

  startTextRotation(loadingTexts: string[]){
    this._intervalId = setInterval(() => {
      this.changeLoadingText(loadingTexts[this._loadingTextIndex]);
      this._loadingTextIndex++;
      if(this._loadingTextIndex >= loadingTexts.length){
        this._loadingTextIndex = 0;
      }
    }, 5000);
  }

  stopTextRotation(){
    if(this._intervalId){
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  showGymLoadingOverlay(){
    this._displayGymLoadingOverlay = true;
    this.startTextRotation(this.gymLoadingTexts);
  }

  hideGymLoadingOverlay(){
    this._displayGymLoadingOverlay = false;
    this.stopTextRotation();
  }

  isGymLoadingOverlayDisplayed(){
    return this._displayGymLoadingOverlay;
  }

  showStreetWorkoutLoadingOverlay(){
    this._displayStreetWorkoutLoadingOverlay = true;
    this.startTextRotation(this.streetWorkoutLoadingTexts);
  }

  hideStreetWorkoutLoadingOverlay(){
    this._displayStreetWorkoutLoadingOverlay = false;
    this.stopTextRotation();
  }

  isStreetWorkoutLoadingOverlayDisplayed(){
    return this._displayStreetWorkoutLoadingOverlay;
  }

  showLoadingOverlay(loadingTexts: string[]){
    this._displayLoadingOverlay = true;
    this.startTextRotation(loadingTexts);
  }

  hideLoadingOverlay(){
    this._displayLoadingOverlay = false;
    this.stopTextRotation();
  }

  isLoadingOverlayDisplayed(){
    return this._displayLoadingOverlay;
  }
}
