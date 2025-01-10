import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LoadingComponent } from '../../shared/loading.component';

@Component({
  selector: 'app-gym-essentials',
  templateUrl: './gym-essentials.component.html',
  styleUrl: './gym-essentials.component.scss'
})
export class GymEssentialsComponent extends LoadingComponent {
  constructor(public sidebarService: SidebarService) {
    super();
    this.setLoadingTexts(['loading...']);
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
