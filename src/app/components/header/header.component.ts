import { Component } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import {
  trigger,
  state,
  style,
  animate, 
  transition
} from '@angular/animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private headerService;

  constructor(headerService : HeaderService){
    this.headerService = headerService;
  }

  toggleSidebar(){
    this.headerService.toggleSidebar();
  }
} 

