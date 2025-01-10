import { Component } from '@angular/core';
import { LoadingComponent } from '../../shared/loading.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-dinner-ideas',
  templateUrl: './dinner-ideas.component.html',
  styleUrl: './dinner-ideas.component.scss'
})
export class DinnerIdeasComponent extends LoadingComponent {
  constructor(public sidebarService: SidebarService) {
    super();
    this.setLoadingTexts(['loading...']);
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
