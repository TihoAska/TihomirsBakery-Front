import { Component } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.scss'
})
export class GymComponent {
  constructor(public loadingService: LoadingService) {
  
  }

  ngOnInit(){
    window.scrollTo(0,0);
    this.showLoadingOverlay();
  }

  showLoadingOverlay(){
    this.loadingService.showGymLoadingOverlay();
  }


  ngOnDestroy(){
    this.loadingService.hideGymLoadingOverlay();
  }
}
