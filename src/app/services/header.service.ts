import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  isHamburgerClicked = false;
  $isHamburgerClicked = new BehaviorSubject(this.isHamburgerClicked);

  constructor() { }

}