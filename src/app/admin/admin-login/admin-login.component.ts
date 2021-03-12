import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/service/language.service';
import { LoginService } from 'src/app/service/login.service';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { mailboxValidator, passwordValidator, userNameValidator, verificationCodeValidator } from 'src/app/validator/bussinessValidator';
import { userType } from 'src/app/enumType/UserType';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  // 登录获取验证码表单
  public getVerificationCodeForm: FormGroup;
  // 验证验证码表单
  public verificationCodeForm: FormGroup;

  // 语言
  public language: string;

  // 当前步骤
  public current = 0;

  //登录界面展示图片
  public array = ['http://localhost:8080/image/register/1.jpg',
    'http://localhost:8080/image/register/2.jpg',
    'http://localhost:8080/image/register/3.jpg'];

  // 下一步是否可选标志位 false 代表可选
  public disabled = false;

  // 请求验证码服务返回的code信息
  public flag: string;

  // 失败原因
  public errorMsg: string;
  public user = {
    'userName': '',
    'password': '',
    'mailbox': '',
    'verificationCode': ''
  };

  public changeLanguage(value: string): void {
    this.languageService.setLanguage(value);
    this.language = value;
    this.translate.use(this.language);
  }

  constructor(private languageService: LanguageService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService) {
    this.translate.use('zh');
    // 生成表单
    this.buildGetVerificationCodeForm();
  }

  ngOnInit(): void {
  }

  /**
   * 生成登录表单
   */
  public buildGetVerificationCodeForm(): void {
    this.getVerificationCodeForm = this.fb.group(
      {
        userName: [this.user.userName, [userNameValidator()]],
        password: [this.user.password, [passwordValidator()]],
        mailbox: [this.user.mailbox, [Validators.required, mailboxValidator()]],
      });
  }

   /**
   * 验证验证码表单
   */
  public buildVerificationCodeForm(): void {
    this.verificationCodeForm = this.fb.group(
      {
        mailbox: [this.user.mailbox],
        verificationCode: [this.user.verificationCode, [Validators.required, verificationCodeValidator()]]
      });
  }

  /**
   * 返回上一步
   */
  pre(): void {
    this.current -= 1;
    this.disabled = false;
  }

  /**
   * 导航去首页
   */
  public goToHomepage(): void {
    this.router.navigate(['']);
  }

  next(num: number): void {
    if (num === 1) {
      //检验获取验证码表单
      if (this.checkMailbox() && this.checkUsername() && this.checkPassword()) {
        this.disabled = true;
        this.loginService.adminLoginGetVerificationCode(this.user).subscribe(data => {
          if (data.code === StatusCode.CREATE_VERIFICATION_CODE_COMPLETE) {
            // 发送验证码成功，显示文字提示
            this.current += 1;
            this.buildVerificationCodeForm();
            this.flag = StatusCode.CREATE_VERIFICATION_CODE_COMPLETE;
          } else if (data.code === StatusCode.SEND_EMAIL_FAILED) {
            // 发送验证码邮件失败，显示文字提示
            this.flag = StatusCode.SEND_EMAIL_FAILED;
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.VERIFICATION_CODE_NOT_EXPIRED) {
            // 验证码并没有失效，显示文字提示
            this.flag = StatusCode.VERIFICATION_CODE_NOT_EXPIRED;
            this.current += 1;
            this.buildVerificationCodeForm();
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.VERIFICATION_CODE_FAILURE) {
            // 验证码失效
            this.flag = StatusCode.VERIFICATION_CODE_FAILURE;
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.UNKNOWN_ERROR) {
            // 系统发生未知错误
            this.flag = StatusCode.UNKNOWN_ERROR;
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.USERNAME_IS_NOT_EXISTS) {
            // 用户名不存在
            this.flag = StatusCode.USERNAME_IS_NOT_EXISTS;
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.INSUFFICIENT_PERMISSIONS) {
            // 权限不足
            this.flag = StatusCode.INSUFFICIENT_PERMISSIONS;
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.WRONG_PASSWORD) {
            // 密码错误
            this.flag = StatusCode.WRONG_PASSWORD;
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.MAILBOX_ERROR) {
            // 与绑定邮箱不一致
            this.flag = StatusCode.MAILBOX_ERROR;
            // 移动到顶部
            window.scrollTo(0, 0);
          }
          this.disabled = false;
        });
      }
    } else {
      //检验验证码表单
      if (this.checkVerificationCode()) {
        this.loginService.adminLogin(this.user).subscribe(data => {
          if(data.code === StatusCode.VERIFICATION_CODE_VERIFICATION_FAILED){
            // 验证码验证失败
            this.flag = StatusCode.VERIFICATION_CODE_VERIFICATION_FAILED;
            this.errorMsg = '验证码验证失败，请到邮箱查看验证码';
          }else if(data.code === StatusCode.VERIFICATION_CODE_FAILURE){
            // 验证码失效
            this.flag = StatusCode.VERIFICATION_CODE_FAILURE;
            this.errorMsg = '验证码失效，需要用户重新申请验证码';
          }else if(data.code === StatusCode.SUCCESS){
            // 成功
            this.flag = StatusCode.SUCCESS;
            this.loginService.setUser(data.body);
            this.router.navigate(['/admin/homepage'], { queryParams: { userName: this.user.userName } });
          }
          // 显示结果
          this.current+=1;
        });

      }
    }
  }

  /**
  * 检查用户名格式是否正确
  */
  public checkUsername(): boolean {
    const value = this.user.userName;
    const reg = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;
    const result = reg.test(value);
    return result;
  };

  /**
  * 检查邮箱格式是否正确
  */
  public checkMailbox(): boolean {
    const value = this.user.mailbox;
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 检查密码格式是否正确
   */
  public checkPassword(): boolean {
    const value = this.user.password;
    const reg = /^[a-zA-Z]\w{9,19}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 检查验证码格式是否正确
   */
  public checkVerificationCode(): boolean {
    const value = this.user.verificationCode;
    const reg = /^\d{6}$/;
    const result = reg.test(value);
    return result;
  }

  /**
   * 重新登录
   */
  public reLogin(): void{
    this.current = 0;
    this.user.password = '';
    this.user.mailbox = '';
    this.user.verificationCode = '';
  }
}
