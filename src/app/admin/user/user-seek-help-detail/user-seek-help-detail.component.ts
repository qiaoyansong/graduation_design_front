import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-seek-help-detail',
  templateUrl: './user-seek-help-detail.component.html',
  styleUrls: ['./user-seek-help-detail.component.scss']
})
export class UserSeekHelpDetailComponent implements OnInit {

  public queryParams;
  // 用户名
  public userName: string;
  public help;
  // 求助内容内容
  public safeArticle;
  constructor(public activeRouter: ActivatedRoute,
    private adminService: AdminService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private loginService: LoginService) {
    this.userName = this.loginService.getUserName();
    this.activeRouter.queryParams.subscribe(params => {
      this.queryParams = params.id;
    })
    this.userService.getSeekHelpInfoById(this.queryParams).subscribe(data => {
      this.help = data.body;
      this.safeArticle = this.sanitizer.bypassSecurityTrustHtml(this.help.content);
    })
  }

  ngOnInit(): void {
  }

  /**
   * 同意投稿
   */
  public agree(): void {
    this.adminService.agreeSeekHelp(this.queryParams).subscribe(data => {
      this.router.navigate(['/admin/homepage'], { queryParams: { userName: this.userName } });
    });
  }

  /**
   * 拒绝投稿
   */
  public refuse(): void {
    this.adminService.refuseSeekHelp(this.queryParams).subscribe(data => {
      this.router.navigate(['/admin/homepage'], { queryParams: { userName: this.userName } });
    });
  }
}
