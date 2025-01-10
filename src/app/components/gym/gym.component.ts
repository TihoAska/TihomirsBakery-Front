import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LoadingComponent } from '../../shared/loading.component';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.scss'
})
export class GymComponent extends LoadingComponent {
  constructor(public sidebarService: SidebarService) {
    super();
    this.setLoadingTexts(['loading...', 'warming up...', 'doing pushups...', 'bench pressing...', 'bar stuck...', 'help pls...']);
  }

  ngOnInit(){
    window.scrollTo(0,0);
    this.startLoadingTextRotation();
  }

  onVideoLoad(){
    this.onVideosLoaded(12);
  }
}
