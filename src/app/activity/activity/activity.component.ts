import { TemplateRef, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { newsSummaryValidator } from 'src/app/validator/bussinessValidator';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  public queryParams;
  public news;
  // 活动内容
  public safeArticle;
  // 是否登录
  public isLogin: boolean;
  // 用户名
  public userName: string;
  // 文字头像颜色列表
  public colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  // 文字头像颜色
  public color;
  // 语言
  public language: string;
  // 用户类别
  public userType: string;
  // 别处登录标识
  public otherFlag = false;
  //头像
  public headPortrait = null;
  // 当前页数
  public pageIndex: number;
  // 当前每页的数据条数
  public pageSize: number;
  // 当前数据条数
  public sizeTotal: number;
  // 倒计时
  public deadline;
  // 倒计时标志位
  public flag = true;
  // 报名公益活动表单
  public signUpActivityForm: FormGroup;
  // 模态框
  public newsModal?: NzModalRef;
  // 报名是否成功标志位
  public signUpFlag = false;
  // 判断该用户
  public repeatFlag = false;
  // 判断该用户
  public fillFlag = false;
  constructor(public activeRouter: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    private loginService: LoginService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private modal: NzModalService,
    private fb: FormBuilder) {
    this.otherFlag = false;
    this.translate.use('zh');
    this.pageIndex = 1;
    this.pageSize = 10;
    this.activeRouter.queryParams.subscribe(params => {
      this.queryParams = params.id;
    });
    // 判断当前session有没有登陆过，及时页面刷新仍能保留数据
    this.loginService.getSaveInfo().subscribe(data => {
      if (data.code === StatusCode.LOGIN_ELSEWHERE) {
        // 别处登录 还需要显示别处登录的提示信息
        this.userName = '';
        this.loginService.removeUser();
        this.isLogin = false;
        this.userType = '';
        this.otherFlag = true;
        // 移动到顶部
        window.scrollTo(0, 0);
      } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
        // 用户未登录
        this.userName = '';
        this.loginService.removeUser();
        this.isLogin = false;
        this.userType = '';
      } else {
        if (data.body != null) {
          // 如果用户名不为空 设置用户名
          this.userName = data.body.userName;
          this.loginService.setUser(data.body);
          this.isLogin = true;
          this.userType = this.loginService.getUserType();
        } else {
          // 如果用户为空 证明当前没有登陆过，需要清除用户信息
          this.userName = '';
          this.loginService.removeUser();
          this.isLogin = false;
          this.userType = '';
        }
      }
      if (this.loginService.getUser() != null) {
        this.headPortrait = this.loginService.getUser().headPortrait;
      }
    });
    this.userService.getActivityInfoById(this.queryParams).subscribe(data => {
      this.news = data.body;
      this.deadline = new Date(data.body.beginTime).getTime() + new Date(data.body.endTime).getTime() - new Date(data.body.beginTime).getTime();
      this.safeArticle = this.sanitizer.bypassSecurityTrustHtml(this.news.content);
      this.flag = this.deadline >= new Date().getTime() ? true : false;
    });
  }
  ngOnInit(): void {
  }

  /**
  * 退出登录
  */
  public logout(): void {
    // 登录标志为设置为false
    this.isLogin = false;
    // 请求退出操作
    this.loginService.logout(this.userName).subscribe(data => {
      this.loginService.removeUser();
    }
    );
  }

  /**
  * 前往个人中心
  */
  public goToPersonalPage(): void {
    this.router.navigate(['/personal'], { queryParams: { userName: this.userName } });
  }

  /**
   * 前往管理员后台界面
   */
  public goToAdminPersonalPage(): void {
    this.router.navigate(['/admin/homepage'], { queryParams: { userName: this.userName } });
  }

  /**
   * 导航去忘记密码界面
   */
  public afterClose(num: number): void {
    if (num == 1) {
      this.router.navigate(['/forgetpwd']);
    } else {
      this.signUpFlag = false;
      this.repeatFlag = false;
      this.fillFlag = false;
    }
  }

  /**
   *  导航去login界面
   */
  public login(): void {
    this.router.navigate(['/login']);
  }

  /**
   * 导航去register界面
   */
  public register(): void {
    this.router.navigate(['/register']);
  }

  /**
   * 报名活动
   */
  public signUp(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    if (this.loginService.getUser() == null) {
      this.router.navigate(['/login']);
    } else {
      this.flag = this.deadline >= new Date().getTime() ? true : false;
      if (this.flag) {
        // 报名活动
        this.createTplModal(tplTitle, tplContent, tplFooter);
      }
    }
  }

  /**
  * 构建上传公益资讯表单
  */
  public buildUploadActivityForm(): void {
    this.signUpActivityForm = this.fb.group(
      {
      });
  }
  public createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.buildUploadActivityForm();
    this.newsModal = this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        value: 'Template Context'
      },
    });
  }
  /**
 * 销毁模态框
 */
  public destroyTplModal(): void {
    this.signUpFlag = false;
    this.newsModal!.destroy();
  }

  /**
   * 报名活动
   */
  public signUp0(): void {
    let params = {
      'userId': this.loginService.getUserId() + '',
      'activityId': this.queryParams
    }
    this.userService.signUp(params).subscribe(data => {
      if (data.code === StatusCode.SUCCESS) {
        // 提示报名成功
        this.signUpFlag = true;
        // 移动到顶部
        window.scrollTo(0, 0);
      } else if (data.code === StatusCode.REPEAT_THE_EVENT) {
        // 已经参加过该活动了
        this.repeatFlag = true;
        // 移动到顶部
        window.scrollTo(0, 0);
      }else if (data.code === StatusCode.FILL_UP) {
        // 人数已满，不允许参加活动
        this.fillFlag = true;
        // 移动到顶部
        window.scrollTo(0, 0);
      }
      this.destroyTplModal();
    });
  }

}
