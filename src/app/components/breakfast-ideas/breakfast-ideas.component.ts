import { Component } from '@angular/core';
import { LoadingComponent } from '../../shared/loading.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-breakfast-ideas',
  templateUrl: './breakfast-ideas.component.html',
  styleUrl: './breakfast-ideas.component.scss'
})
export class BreakfastIdeasComponent extends LoadingComponent{
  constructor(public sidebarService: SidebarService) {
    super();
    this.setLoadingTexts(['loading...']);
  }

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
