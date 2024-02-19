import { Component } from '@angular/core';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'TihomirsBakery';

  constructor(private headerService : HeaderService){
  }

}