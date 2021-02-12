import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../service/language.service';
import { LoginService } from '../service/login.service';
import { StatusCode } from '../statusCode/StatusCode';

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
  constructor(private languageService: LanguageService, private translate: TranslateService, 
    private router: Router,
    private loginService: LoginService) {
    this.translate.use('zh');
    this.isLogin = this.loginService.isLogin();
    // 判断当前有没有用户登录
    if(this.isLogin){
      this.userName = this.loginService.getUserName();
    }
    // 判断当前session有没有登陆过，及时页面刷新仍能保留数据
    this.loginService.getSaveInfo().subscribe(data => {
      if(data.code === StatusCode.LOGIN_ELSEWHERE){
        // 别处登录
        this.userName = '';
        this.loginService.removeUserName();
        this.isLogin = false;
      }else{
        if(data.body != null){
          // 如果用户名不为空 设置用户名
          this.userName = data.body;
          this.loginService.setUserName(this.userName);
          this.isLogin = true;
        }else{
          // 如果用户名为空 证明当前没有登陆过，需要清除用户信息
          this.userName = '';
          this.loginService.removeUserName();
          this.isLogin = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.language = this.languageService.getLanguage();
    this.translate.use(this.language);
    // 每次随机生成颜色 生成[0,3]的随机数
    this.color = this.colorList[Math.floor(Math.random()*4)];
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
  public goToPersonalPage(): void{
    this.router.navigate(['/personal'], { queryParams: { userName: this.userName } });
  }

  /**
   * 退出登录
   */
  public logout():void{
    // 登录标志为设置为false
    this.isLogin = false;
    // 请求退出操作
    this.loginService.logout(this.userName).subscribe(data => {
     
      }
    );
  }

  /**
   * 搜索框
   */
  public search(): void {
    console.log('value' + this.searchValue);
  }
}
