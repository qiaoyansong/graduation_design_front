import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-seek-help-detail',
  templateUrl: './seek-help-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./seek-help-detail.component.scss']
})
export class SeekHelpDetailComponent implements OnInit {

  public queryParams;
  public help;
  // 求助内容内容
  public safeArticle;
  constructor(public activeRouter: ActivatedRoute,
    private userService: UserService,
    private sanitizer: DomSanitizer) {
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

}
