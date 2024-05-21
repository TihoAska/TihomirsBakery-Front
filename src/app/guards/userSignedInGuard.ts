import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { of } from "rxjs";
import { AccountService } from "../services/account.service";

export const UserSignedInGuard : CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);

    if (accountService.checkAccessToken()) {
        return of(true);
    }

    return of(false);
}