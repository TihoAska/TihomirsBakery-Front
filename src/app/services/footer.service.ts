import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  public isPlusClicked : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isHamburgerClicked : BehaviorSubject<boolean> = new BehaviorSubject(false);

  hamburgerMenu = { icon: '../../../assets/images/sidebar-icons/hamburger-menu-white.png', name: 'HM'};
  
  pluses = [
    { icon: '../../../assets/icons/pluses/plus-red.png', name: 'PLUS-RED'},
    { icon: '../../../assets/icons/pluses/plus-orange.png', name: 'PLUS-ORANGE'},
    { icon: '../../../assets/icons/pluses/plus-light-blue.png', name: 'PLUS-LIGHT-BLUE'},
    { icon: '../../../assets/icons/pluses/plus-white.png', name: 'PLUS-WHITE'},
    { icon: '../../../assets/icons/pluses/plus-dark-blue.png', name: 'PLUS-DARK-BLUE'},
  ]

  socials = [
    { icon: '../../../assets/facebook-white.png', name: 'FB'},
    { icon: '../../../assets/instagram-white.png', name: 'IG'},
    { icon: '../../../assets/twitter-white.png', name: 'TW'},
    { icon: '../../../assets/github.png', name: 'GH'},
  ]
  
  constructor() { }
}
