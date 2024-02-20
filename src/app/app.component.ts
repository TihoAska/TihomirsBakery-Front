import { Component } from '@angular/core';
import { HeaderService } from './services/header.service';
import { FooterService } from './services/footer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger(
      'dimBackground', [
        state(
          'dim',
          style({
            opacity: 0.5,
          })
        ),
        state(
          'undim',
          style({
            opacity: 1,
          })
        ),
        transition('dim <=> undim', animate('200ms ease-in-out')),
      ],
    )
  ]
})
export class AppComponent {

  title = 'TihomirsBakery';

  constructor(public footerService : FooterService, public helperService : HelperService){

  }

  undim(){
    this.footerService.isPlusClicked.next(false);
    this.helperService.windowChoice.next('add');
  }
}