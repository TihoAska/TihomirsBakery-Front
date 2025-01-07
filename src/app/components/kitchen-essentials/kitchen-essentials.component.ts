import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-kitchen-essentials',
  templateUrl: './kitchen-essentials.component.html',
  styleUrl: './kitchen-essentials.component.scss'
})
export class KitchenEssentialsComponent {
  isImageLoaded = false;

  constructor(public loadingService: LoadingService) {
    
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }

  onImageLoad(){
    this.isImageLoaded = true;
  }
}
