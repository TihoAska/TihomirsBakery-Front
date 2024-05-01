import { Component, HostListener } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import {
  trigger,
  state,
  style,
  animate, 
  transition
} from '@angular/animations'
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { FooterService } from '../../services/footer.service';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger(
      'showSidebar', [
        state(
          'show',
          style({
            width: '300px',
            zIndex: 5,
          })
        ),
        state(
          'hide',
          style({
            width: '100px',
            zIndex: 5,
          })
        ),
        transition('show <=> hide', animate('300ms ease-in-out')),
      ],
    ),
    trigger(
      'showName', [
        state(
          'show',
          style({
            opacity: 1,
            zIndex: 1,
          })
        ),
        state(
          'hide',
          style({
            opacity: 0,
            zIndex: 1,
          })
        ),
        transition('show <=> hide', animate('300ms ease-in-out')),
      ],
    )
  ]
})
export class SidebarComponent {
  @HostListener('mouseenter')
  onMouseEnter() {
    this.showSidebar = true;
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.showSidebar = false;
  }
  
  showSidebar = false;
  isHamburgerClicked = false;

  constructor(
    public sidebarService : SidebarService,
    private router : Router,
    private helperService : HelperService,
    private userService : UserService,
    public accountService : AccountService){
  }

  ngOnInit(){
    
  }

  navigateTo(path){
    if(path == 'HOME'){
      this.router.navigate([''])
    } else if(path == 'YOUR DAY'){
      this.router.navigate(['your-day']);
    } else if (path == 'WORKOUT SPOTS'){
      this.router.navigate(['map']);
    } else if (path == 'GYM ESSENTIALS'){
      this.router.navigate(['gym-essentials'])
    } else if (path == 'KITCHEN ESSENTIALS'){
      this.router.navigate(['kitchen-essentials'])
    }
    this.helperService.scrollTo.next(path);
  }

  showLogin(){
    this.sidebarService.toggleLogin.next(true);
    this.helperService.dimBackground.next(true);
  }

  showProfile(){
    this.sidebarService.toggleProfile.next(true);
    this.helperService.dimBackground.next(true);
  }
}
