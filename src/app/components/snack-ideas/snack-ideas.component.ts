import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LoadingComponent } from '../../shared/loading.component';

@Component({
  selector: 'app-snack-ideas',
  templateUrl: './snack-ideas.component.html',
  styleUrl: './snack-ideas.component.scss'
})
export class SnackIdeasComponent extends LoadingComponent {
  constructor(public sidebarService: SidebarService) {
    super();
    this.setLoadingTexts(['loading...']);
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
