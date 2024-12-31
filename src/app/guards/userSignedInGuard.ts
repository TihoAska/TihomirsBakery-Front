import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";
import { AccountService } from "../services/account.service";
import { HelperService } from "../services/helper.service";
import { SidebarService } from "../services/sidebar.service";
import { UserService } from "../services/user.service";

export const UserSignedInGuard : CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const userService = inject(UserService);
    const sidebarService = inject(SidebarService);

    if (accountService.isUserLoggedIn()){
        return true;
    } else{
        let refreshToken = accountService.getRefreshTokenFromLocalStorage();
  
        if(!refreshToken){
          accountService.setIsFromAuth(true);
          sidebarService.openLoginWindow();
          return false;
        }
  
        return accountService.refreshAccessToken(refreshToken).pipe(
          map((isRefreshed) => {
            if(isRefreshed){
              return true;
            } else{
              userService.logOut();
              return false;
            }
          })
        )
    }
}