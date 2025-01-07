import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-gym-essentials',
  templateUrl: './gym-essentials.component.html',
  styleUrl: './gym-essentials.component.scss'
})
export class GymEssentialsComponent {
  isImageLoaded = false;

  constructor(public loadingService: LoadingService) {
    
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }

  onImageLoaded(){
    this.isImageLoaded = true;
  }
}
