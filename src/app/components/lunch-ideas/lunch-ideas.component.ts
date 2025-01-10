import { Component } from '@angular/core';
import { LoadingComponent } from '../../shared/loading.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-lunch-ideas',
  templateUrl: './lunch-ideas.component.html',
  styleUrl: './lunch-ideas.component.scss'
})
export class LunchIdeasComponent extends LoadingComponent {
  constructor(public sidebarService: SidebarService) {
    super();
    this.setLoadingTexts(['loading...']);
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
