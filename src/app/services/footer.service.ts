import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  public isPlusClicked : BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  pluses = [
    { icon: '../../../assets/plus-orange.png', name: 'PLUS-ORANGE'},
    { icon: '../../../assets/plus-black.png', name: 'PLUS-BLACK'},
    { icon: '../../../assets/plus-white.png', name: 'PLUS-WHITE'},
    { icon: '../../../assets/plus-dark-blue.png', name: 'PLUS-DARK-BLUE'},
  ]

  socials = [
    { icon: '../../../assets/facebook-white.png', name: 'FB'},
    { icon: '../../../assets/instagram-white.png', name: 'IG'},
    { icon: '../../../assets/twitter-white.png', name: 'TW'},
    { icon: '../../../assets/github.png', name: 'GH'},
  ]
  
  constructor() { }
}
