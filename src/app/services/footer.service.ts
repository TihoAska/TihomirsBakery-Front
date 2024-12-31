import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private  _isHamburgerClicked = false;
  
  constructor() { }

  setIsHamburgerClicked(value: boolean){
    this._isHamburgerClicked = value;
  }

  isHamburgerClicked(){
    return this._isHamburgerClicked;
  }
}
