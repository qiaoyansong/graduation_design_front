import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { LoginService } from "../service/login.service";

@Injectable({
    providedIn: 'root',
})
export class IsLoginGuard implements CanActivate{
    constructor(private loginService: LoginService, private router: Router) {}
    canActivate():true | UrlTree{
        return this.checkLogin();
    }
    checkLogin(): true | UrlTree {
        if (this.loginService.isLogin()) { return true; }
        return this.router.createUrlTree(['/login']);
    }
}
