import { HelperService } from './../../services/helper.service';
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrl: './your-profile.component.scss'
})
export class YourProfileComponent {

  constructor(
    public sidebarService : SidebarService,
    public accountService : AccountService,
    public helperService : HelperService) {
    
  }

  closeProfile(){
    this.sidebarService.toggleProfile.next(false);
    this.helperService.dimBackground.next(false);
  }

  logOut(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.sidebarService.toggleProfile.next(false);
    this.helperService.dimBackground.next(false);

    this.accountService.loggedUser.next(new User(-1));
  }

  toggleAvatarPicker(){
    this.sidebarService.toggleProfile.next(false);
    this.sidebarService.toggleAvatarPickerWindow.next(true);
  }
}
