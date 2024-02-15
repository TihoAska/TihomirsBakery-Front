import { Component } from '@angular/core';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'TihomirsBakery';
  isSidebarOpen: boolean = false;

  constructor(private headerService : HeaderService){
    this.headerService.$isHamburgerClicked.subscribe((clicked) => {
      this.isSidebarOpen = clicked;
    })
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    if (this.isSidebarOpen) {
      this.isSidebarOpen = false;
    }
  }
}