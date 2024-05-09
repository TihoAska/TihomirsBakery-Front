import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { of } from "rxjs";
import { AccountService } from "../services/account.service";

export const UserSignedInGuard : CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const router = inject(Router);

    if (accountService.checkAccessToken()) {
        return of(true);
    }

    return of(false);
}