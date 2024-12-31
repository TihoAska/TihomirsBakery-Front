import { Component } from '@angular/core';

@Component({
  selector: 'app-kitchen-essentials',
  templateUrl: './kitchen-essentials.component.html',
  styleUrl: './kitchen-essentials.component.scss'
})
export class KitchenEssentialsComponent {
  ngOnInit(){
    window.scrollTo(0,0);
  }
}
