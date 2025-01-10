import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LoadingComponent } from '../../shared/loading.component';

@Component({
  selector: 'app-kitchen-essentials',
  templateUrl: './kitchen-essentials.component.html',
  styleUrl: './kitchen-essentials.component.scss'
})
export class KitchenEssentialsComponent extends LoadingComponent{
  constructor(public sidebarService: SidebarService) {
    super();
    this.setLoadingTexts(['loading...']);
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
