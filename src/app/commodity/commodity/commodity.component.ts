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
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./commodity.component.scss']
})
export class CommodityComponent implements OnInit {


  public queryParams;
  public news;
  // 商品内容
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
  // 模态框
  public newsModal?: NzModalRef;
  // 点数不足表单
  public insufficientPointsForm: FormGroup;
  // 选择地址表单
  public addressSelectionForm: FormGroup;
  // 当前用户信息
  public user;
  // 地址信息
  public data;
  // 选择到的地址
  public selected;
  // 兑换商品标志位
  public flag;
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
    this.userService.getCommodityInfoById(this.queryParams).subscribe(data => {
      this.news = data.body;
      this.safeArticle = this.sanitizer.bypassSecurityTrustHtml(this.news.content)
    });
    this.user = this.loginService.getUser();
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
    this.destroyTplModal();
    this.router.navigate(['/personal'], { queryParams: { userName: this.userName } });
  }

  /**
   * 前往管理员后台界面
   */
  public goToAdminPersonalPage(): void {
    this.destroyTplModal();
    this.router.navigate(['/admin/homepage'], { queryParams: { userName: this.userName } });
  }

  /**
   * 前往活动列表界面
   */
  public goToActivityList(): void {
    this.destroyTplModal();
    this.router.navigate(['/activityList']);
  }

  /**
   * 导航去忘记密码界面
   */
  public afterClose(num: number): void {
    if (num == 1) {
      this.router.navigate(['/forgetpwd']);
    } else {
      this.flag = '';
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
  * 构建点数不足模态框
  */
  public buildInsufficientPointsForm(): void {
    this.insufficientPointsForm = this.fb.group(
      {
      });
  }

  /**
  * 构建选择地址模态框
  */
  public buildAddressSelectionForm(): void {
    this.addressSelectionForm = this.fb.group(
      {
      });
  }

  public createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>, flag: number): void {
    if (flag == 1) {
      // 展示点数不够模态框
      this.buildInsufficientPointsForm();
    } else {
      // 展示选择地址模态框
      let condition = {
        'condition': {
          'orderBy': '',
          'userId': this.user.id
        },
        'curPage': ''
      };
      condition.curPage = this.pageIndex + '';
      condition.condition.orderBy = 'desc';
      this.userService.getAddressListByUserId(condition).subscribe(data => {
        if (data.code === StatusCode.SUCCESS) {
          this.sizeTotal = data.totalSize;
          this.data = data.body;
        }
      });
    }
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
    this.newsModal!.destroy();
  }

  count = 0;

  /**
   * 选择地址
   * @param num 选项
   */
  public select(num: number): void {
    this.selected = num;
    this.count++;
  }
  /**
   * 兑换商品
   */
  public exchangeCommodity() {
    if (this.count % 2 == 0 && this.selected != null) {
      // 业务逻辑
      let deliverCommodity = {
        'commodityId': this.queryParams,
        'userId': this.user.id,
        'userLocationsId': this.selected
      }
      this.userService.exchangeCommodity(deliverCommodity).subscribe(data => {
        if (data.code === StatusCode.SUCCESS) {
          // 商品兑换成功，提示信息
          this.flag = StatusCode.SUCCESS;
        } else if (data.code === StatusCode.UNKNOWN_ERROR) {
          // 未知错误，提示信息
          this.flag = StatusCode.UNKNOWN_ERROR;
        } else if (data.code === StatusCode.OUT_OF_STOCK) {
          // 商品库存不足，提示信息
          this.flag = StatusCode.OUT_OF_STOCK;
        } else if (data.code === StatusCode.INSUFFICIENT_POINTS) {
          // 积分不足，提示信息
          this.flag = StatusCode.INSUFFICIENT_POINTS;
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.destroyTplModal();
      });
    }
  }
}
