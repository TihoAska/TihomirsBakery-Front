import { Component } from '@angular/core';

@Component({
  selector: 'app-breakfast-ideas',
  templateUrl: './breakfast-ideas.component.html',
  styleUrl: './breakfast-ideas.component.scss'
})
export class BreakfastIdeasComponent {
  ngOnInit(){
    window.scrollTo(0,0);
  }
}
