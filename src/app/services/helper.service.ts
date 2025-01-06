import { BACKEND_URL } from './tokens.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private _dimBackground = false;
  private _displayLoadingOverlay = false;
  private _loadingTexts = ['loading...', 'baking bread...', 'kneading dough...', 'oven on fire...', 'house burning down...'];
  private _loadingText = 'loading...'
  private _loadingTextIndex = 1;
  private _intervalId;
  
  $scrollTo : BehaviorSubject<string> = new BehaviorSubject('');
  $isSessionExpired: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { 

  }

  getLoadingText(){
    return this._loadingText;
  }

  changeLoadingText(loadingText){
    this._loadingText = loadingText;
  }

  startTextRotation(){
    this._intervalId = setInterval(() => {
      this.changeLoadingText(this._loadingTexts[this._loadingTextIndex]);
      this._loadingTextIndex++;
      if(this._loadingTextIndex > 4){
        this._loadingTextIndex = 0;
      }
    }, 3000);
  }

  stopTextRotation(){
    if(this._intervalId){
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  showLoadingOverlay(){
    this._displayLoadingOverlay = true;
    this.startTextRotation();
  }

  hideLoadingOverlay(){
    this._displayLoadingOverlay = false;
    this.stopTextRotation();
  }

  isLoadingOverlayDisplayed(){
    return this._displayLoadingOverlay;
  }

  dimBackground(){
    this._dimBackground = true;
  }

  undimBackground(){
    this._dimBackground = false;
  }

  isBackgroundDimmed(){
    return this._dimBackground;
  }

  scrollTo(path){
    this.$scrollTo.next(path);
  }

  isResponseValid(res){
    return res && Object.keys(res).length > 0;
  }
}
