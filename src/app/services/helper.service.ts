import { BACKEND_URL } from './tokens.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private _dimBackground = false;

  
  $scrollTo : BehaviorSubject<string> = new BehaviorSubject('');
  $isSessionExpired: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { 

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
