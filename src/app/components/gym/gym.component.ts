import { Component } from '@angular/core';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.scss'
})
export class GymComponent {
  ngOnInit(){
    window.scrollTo(0,0);
  }
}
