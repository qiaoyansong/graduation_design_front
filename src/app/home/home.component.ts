import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';
import { LoginService } from '../service/login.service';
import { StatusCode } from '../enumType/StatusCode';
import { HomepageService } from '../service/homepage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // 搜索内容
  public searchValue: string;
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
  //主页展示图片
  public array = ["http://localhost:8080/upload/pic/2021032317365104843.jpg",
  "http://localhost:8080/upload/pic/2021032317384910063.jpg",
  "http://localhost:8080/upload/pic/2021032317475252074.jpg"];
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
  // 国内
  public guonei;
  // 政府
  public zhengfu;
  // 学校
  public xuexiao;
  // 企业
  public qiye;
  // 益人
  public yiren;
  // 好人
  public haoren;
  // 好事
  public haoshi;
  // 评选
  public pingxuan;
  constructor(private languageService: LanguageService, private translate: TranslateService,
    private router: Router,
    private loginService: LoginService,
    private homepageService: HomepageService) {
    this.otherFlag = false;
    this.translate.use('zh');
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
      }else if(data.code === StatusCode.USER_IS_NOT_LOGGED_IN){
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
      if(this.loginService.getUser() != null){
        this.headPortrait = this.loginService.getUser().headPortrait;
      }
    });
    this.homepageService.getListOfHomepageGuoNei().subscribe(data => {
      this.guonei = data.body;
    });
    this.homepageService.getListOfHomepageZhengFu().subscribe(data => {
      this.zhengfu = data.body;
    });
    this.homepageService.getListOfHomepageXueXiao().subscribe(data => {
      this.xuexiao = data.body;
    });
    this.homepageService.getListOfHomepageQiYe().subscribe(data => {
      this.qiye = data.body;
    });
    this.homepageService.getListOfHomepageYiRen().subscribe(data => {
      this.yiren = data.body;
    });
    this.homepageService.getListOfHomepageHaoRen().subscribe(data => {
      this.haoren = data.body;
    });
    this.homepageService.getListOfHomepageHaoShi().subscribe(data => {
      this.haoshi = data.body;
    });
    this.homepageService.getListOfHomepagePingXuan().subscribe(data => {
      this.pingxuan = data.body;
    });
  }

  ngOnInit(): void {
    this.language = this.languageService.getLanguage();
    this.translate.use(this.language);
    // 每次随机生成颜色 生成[0,3]的随机数
    this.color = this.colorList[Math.floor(Math.random() * 4)];
  }
  /**
   * 切换语言
   * @param value 语言种类
   */
  public changeLanguage(value: string): void {
    this.languageService.setLanguage(value);
    this.language = value;
    this.translate.use(this.language);
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
   * 搜索框
   */
  public search(): void {
    console.log('value' + this.searchValue);
  }

  /**
   * 导航去忘记密码界面
   */
  public afterClose(): void{
    this.router.navigate(['/forgetpwd']);
  }

   /**
   * 根据资讯ID获取详细信息
   */
    public getNewInfoById(id: any): void {
      this.router.navigate(['/news'], { queryParams: { id: id } });
    }
}
