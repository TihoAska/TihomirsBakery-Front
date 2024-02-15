import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  isHamburgerClicked = false;
  $isHamburgerClicked = new BehaviorSubject(this.isHamburgerClicked);

  constructor() { }

  toggleSidebar(){
    this.isHamburgerClicked = !this.isHamburgerClicked;
    this.$isHamburgerClicked.next(this.isHamburgerClicked);
  }
}