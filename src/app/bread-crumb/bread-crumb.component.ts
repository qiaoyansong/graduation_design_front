import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit {
  private userName;
  constructor(private router: Router,
    private loginService: LoginService) {
      if(this.loginService.isLogin()){
        this.userName = this.loginService.getUserName();
      }
  }
  @Input()
  isAdmin = false;
  @Input()
  type: any
  ngOnInit(): void {
  }
  /**
   * 前往管理后台界面
   */
  public gotoAdminHomepage(): void{
    this.router.navigate(['/admin/homepage'], { queryParams: { userName: this.userName } });
  }
}
