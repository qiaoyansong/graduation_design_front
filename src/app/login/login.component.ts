import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../service/language.service';
import { LoginService } from '../service/login.service';
import { StatusCode } from '../statusCode/StatusCode';
import { passwordValidator, userNameValidator } from '../validator/bussinessValidator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private languageService: LanguageService, 
    private translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService) { 
    this.translate.use('zh');
    this.buildLoginForm();
  }
  // 使用的语言
  language: string;

  // 登录表单
  public loginForm: FormGroup;

  // 登录用户
  public user = {
    'userName':'',
    'password':''
  };

  // 登录标志位
  public flag: string;

  // 判断显示结果还是显示表单标志位 false显示表单 true显示结果
  public isShow = false;

  //显示图片
  public array = ['http://localhost:8080/login/1.jpg',
  'http://localhost:8080/login/2.jpg'];
  ngOnInit(): void {
  }

  /**
   * 改变语言
   * @param value 语言种类
   */
  public changeLanguage(value: string): void {
    this.languageService.setLanguage(value);
    this.language = value;
    this.translate.use(this.language);
  }

  /**
   * 导航去注册界面
   */
  public register():void{
    this.router.navigate(['/register']);
  }

  /**
   * 构建登录表单
   */
  public buildLoginForm(): void {
    this.loginForm = this.fb.group(
      {
        userName: [this.user.userName, [userNameValidator()]],
        password: [this.user.password, [passwordValidator()]],
      });
  }

  /**
   * 用户登录
   */
  public login(): void{
    if(this.checkUsername() && this.checkPassword()){
      this.loginService.login(this.user).subscribe(data => {
        if(data.code === StatusCode.USERNAME_IS_NOT_EXISTS){
          // 用户名不存在
          this.flag = '110';
          // 移动到顶部
          window.scrollTo(0, 0);
        }else if(data.code === StatusCode.WRONG_PASSWORD){
          // 密码错误
          this.flag = '111'
          // 移动到顶部
          window.scrollTo(0, 0);
        }else if(data.code === StatusCode.SUCCESS){
          // 登陆成功
          this.isShow = true;
          this.loginService.setUserName(this.user.userName);
        }
      });
    }
  }

  /**
   * 检查用户名格式是否正确
   */
  public checkUsername() : boolean{
    const value = this.user.userName;
    const reg = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 检查密码格式是否正确
   */
  public checkPassword() : boolean{
    const value = this.user.password;
    const reg = /^[a-zA-Z]\w{9,19}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 导航去个人中心
   */
  public goToPersonCenter(): void {
    this.router.navigate(['/login']);
  }

  /**
   * 导航去首页
   */
  public goToHomepage(): void{
    this.router.navigate(['']);
  }
}
