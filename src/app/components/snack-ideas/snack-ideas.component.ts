import { Component } from '@angular/core';

@Component({
  selector: 'app-snack-ideas',
  templateUrl: './snack-ideas.component.html',
  styleUrl: './snack-ideas.component.scss'
})
export class SnackIdeasComponent {
  ngOnInit(){
    window.scrollTo(0,0);
  }
}
