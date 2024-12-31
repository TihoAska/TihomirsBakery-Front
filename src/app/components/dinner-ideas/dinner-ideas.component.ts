import { Component } from '@angular/core';

@Component({
  selector: 'app-dinner-ideas',
  templateUrl: './dinner-ideas.component.html',
  styleUrl: './dinner-ideas.component.scss'
})
export class DinnerIdeasComponent {
  ngOnInit(){
    window.scrollTo(0,0);
  }
}
