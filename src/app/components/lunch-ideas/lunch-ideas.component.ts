import { Component } from '@angular/core';

@Component({
  selector: 'app-lunch-ideas',
  templateUrl: './lunch-ideas.component.html',
  styleUrl: './lunch-ideas.component.scss'
})
export class LunchIdeasComponent {
  ngOnInit(){
    window.scrollTo(0,0);
  }
}
