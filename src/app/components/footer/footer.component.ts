import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  icons = [
    { icon: '../../../assets/plus-orange.png', name: 'PLUS'},
    { icon: '../../../assets/facebook-icon-orange.png', name: 'FB'},
    { icon: '../../../assets/instagram-icon-orange.png', name: 'IG'},
    { icon: '../../../assets/twitter-icon-orange.png', name: 'TW'}
  ]

}
