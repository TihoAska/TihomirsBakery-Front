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

  togglePlus(){
    this.footerService.isPlusClicked.next(!this.footerService.isPlusClicked.value);
    if(this.footerService.isPlusClicked.value){
      this.router.navigate(['add']);
    } else{
      this.helperService.windowChoice.next('add');
      this.router.navigate(['']);
    }
  }
}
