import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  pluses = [
    { icon: '../../../assets/plus-orange.png', name: 'PLUS-ORANGE'},
    { icon: '../../../assets/plus-black.png', name: 'PLUS-BLACK'},
    { icon: '../../../assets/plus-white.png', name: 'PLUS-WHITE'},
    { icon: '../../../assets/plus-dark-blue.png', name: 'PLUS-DARK-BLUE'},
  ]

  socials = [
    { icon: '../../../assets/facebook-icon-orange.png', name: 'FB'},
    { icon: '../../../assets/instagram-icon-orange.png', name: 'IG'},
    { icon: '../../../assets/twitter-icon-orange.png', name: 'TW'},
  ]

  constructor() { }
}
