import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LoadingComponent } from '../../shared/loading.component';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.scss'
})
export class GymComponent extends LoadingComponent {
  videosLoadedCounter = 0;
  
  constructor(public sidebarService: SidebarService) {
    super();
    this.loadingTexts = ['loading...', 'warming up...', 'doing pushups...', 'bench pressing...', 'bar stuck...', 'help pls...'];
  }

  ngOnInit(){
    window.scrollTo(0,0);
    this.startLoadingTextRotation();
  }

  onVideoLoad(){
    this.videosLoadedCounter++;

    if (this.videosLoadedCounter >= 12) {
      this.displayLoadingOverlay = false;
      this.stopLoadingTextRotation();
    }
  }
}
