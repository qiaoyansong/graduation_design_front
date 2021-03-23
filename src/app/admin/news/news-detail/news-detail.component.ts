import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  public queryParams;
  // 用户名
  public userName: string;
  public news;
  // 文章内容
  public safeArticle;
  constructor(public activeRouter: ActivatedRoute,
    private adminService: AdminService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private loginService: LoginService) {
      this.userName = this.loginService.getUserName();
    this.activeRouter.queryParams.subscribe(params => {
      this.queryParams = params.id;
    })
    this.adminService.getNewInfoById(this.queryParams).subscribe(data => {
      this.news = data.body;
      this.safeArticle = this.sanitizer.bypassSecurityTrustHtml(this.news.article)
    })
  }

  ngOnInit(): void {
  }

  /**
   * 同意投稿
   */
  public agree(): void {
    this.adminService.agreeUserNews(this.queryParams).subscribe(data => {
      this.router.navigate(['/admin/homepage'], { queryParams: { userName: this.userName } });
    });
  }

  /**
   * 拒绝投稿
   */
  public refuse(): void {
    this.adminService.refuseUserNews(this.queryParams).subscribe(data => {
      this.router.navigate(['/admin/homepage'], { queryParams: { userName: this.userName } });
    });
  }
}