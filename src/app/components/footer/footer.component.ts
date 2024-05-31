import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  constructor(
    public footerService : FooterService,
    public router : Router, 
    public helperService : HelperService) 
  {
    
  }

  navigateToSocial(social){
    if(social == 'GH'){
      window.open('https://github.com/TihoAska');
    }
  }

  toggleSidebar(){
    this.footerService.isHamburgerClicked.next(!this.footerService.isHamburgerClicked.value);
  }
}
