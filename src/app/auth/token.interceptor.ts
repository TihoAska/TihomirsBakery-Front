import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';
import { BACKEND_URL } from '../services/tokens.service';
import { HelperService } from '../services/helper.service';
import { SidebarService } from '../services/sidebar.service';
import { UserService } from '../services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('/api/account/Login') || req.url.includes('/api/account/Register') || req.url.includes('api/account/Refresh')){
    return next(req);
  }
  
  const backendUrl = inject(BACKEND_URL);
  const accountService = inject(AccountService);
  const http = inject(HttpClient);
  const helperService = inject(HelperService);
  const sidebarService = inject(SidebarService);
  const userService = inject(UserService);

  const accessToken = accountService.getAccessTokenFromLocalStorage();

  if(!accountService.isTokenValid(accessToken)){
    console.log('Access token has expired, fetching a new one...');
    let refreshToken = accountService.getRefreshTokenFromLocalStorage();

    if(!accountService.isTokenValid(refreshToken)){
      console.log('Refresh token failed. Logging out...');
      userService.logOut();
      sidebarService.openLoginWindow();
      helperService.$isSessionExpired.next(true);
      return throwError(() => new Error('Session expired. Please log in again.'));
    }

    return http.post(backendUrl + 'api/account/Refresh', {
      refreshToken: refreshToken
    }).pipe(
      switchMap((res: any) => {        
        accountService.storeTokensInLocalStorage({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
    
        const newAuthReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${res.accessToken}`,
          },
        });
    
        return next(newAuthReq); 
      }),
      catchError(err => {
        console.log('Refresh token request failed:', err);
        userService.logOut();
        sidebarService.openLoginWindow();
        helperService.$isSessionExpired.next(true);
        return throwError(() => new Error('Session expired. Please log in again.'));
      })
    );
  }

  return next(req);
};
