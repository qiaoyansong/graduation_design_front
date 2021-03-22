import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { LoginService } from "../service/login.service";

@Injectable({
    providedIn: 'root',
})
export class AdminIsLoginGuard implements CanActivate{
    constructor(private loginService: LoginService, private router: Router) {
        this.loginService.getSaveInfo().subscribe(data => {
            if (data.body != null) {
                // 如果用户名不为空 设置用户名
                this.loginService.setUser(data.body);
            }
        });
    }
    canActivate():true | UrlTree{
        return this.checkLogin();
    }
    checkLogin(): true | UrlTree {
        if (this.loginService.isLogin()) { return true; }
        return this.router.createUrlTree(['']);
    }
}
