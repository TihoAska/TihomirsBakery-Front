import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-gym-essentials',
  templateUrl: './gym-essentials.component.html',
  styleUrl: './gym-essentials.component.scss'
})
export class GymEssentialsComponent {
  isImageLoaded = false;

  constructor(public sidebarService: SidebarService) {
    
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }

  onImageLoaded(){
    this.isImageLoaded = true;
  }
}
