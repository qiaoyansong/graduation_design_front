import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../service/language.service';
import { LoginService } from '../../service/login.service';
import { StatusCode } from '../../enumType/StatusCode';
import { mailboxValidator, passwordValidator, userNameValidator, verificationCodeValidator } from '../../validator/bussinessValidator';
import { userType } from '../../enumType/UserType';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService) {
    this.translate.use('zh');
  }

  // 登录获取验证码表单
  public getVerificationCodeForm: FormGroup;

  // 验证验证码表单
  public verificationCodeForm: FormGroup;

  // 修改密码表单
  public modifyPasswordForm: FormGroup;

  // 使用的语言
  language: string;

  // 登录表单
  public loginForm: FormGroup;

  // 登录标志位
  public flag: string;

  // 当前步骤
  public current = 0;


  // 下一步是否可选标志位 false 代表可选
  public disabled = false;

  // 判断显示结果还是显示表单标志位 false显示表单 true显示结果
  public isShow = false;

  // 是否修改密码成功
  public modifyPasswordFlag = false;

  public user = {
    'userName': '',
    'mailbox': '',
    'verificationCode': '',
    'password': '',
    'checkPassword': ''
  };

  //显示图片
  public array = ['http://localhost:8080/image/login/1.jpg',
    'http://localhost:8080/image/login/2.jpg'];
  ngOnInit(): void {
    this.buildGetVerificationCodeForm();
  }

  /**
   * 导航去注册界面
   */
  public register(): void {
    this.router.navigate(['/register']);
  }

  /**
   * 返回上一步
   */
  pre(): void {
    this.current -= 1;
    this.disabled = false;
    this.user.password = '';
    this.user.checkPassword = '';
    this.user.verificationCode = '';
  }

  /**
   * 
   * @param num 如果是1那么就获取验证码 如果是2就验证验证码是否正确
   */
  next(num: number): void {
    if (num === 1) {
      // 获取验证码
      this.current += 1;
      this.buildModifyPasswordForm();
      if (this.checkMailbox() && this.checkUsername()) {
        this.disabled = true;
        this.loginService.modifyPasswordGetVerificationCode(this.user).subscribe(data => {
          if (data.code === StatusCode.CREATE_VERIFICATION_CODE_COMPLETE) {
            // 发送验证码成功，显示文字提示
            this.flag = StatusCode.CREATE_VERIFICATION_CODE_COMPLETE;
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.SEND_EMAIL_FAILED) {
            // 发送验证码邮件失败，显示文字提示
            this.flag = StatusCode.SEND_EMAIL_FAILED;
            window.scrollTo(0, 0);
            this.current--;
          } else if (data.code === StatusCode.VERIFICATION_CODE_NOT_EXPIRED) {
            // 验证码并没有失效，显示文字提示
            this.flag = StatusCode.VERIFICATION_CODE_NOT_EXPIRED;
            // 移动到顶部
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.USERNAME_IS_NOT_EXISTS) {
            // 用户名不存在，显示文字提示
            this.flag = StatusCode.USERNAME_IS_NOT_EXISTS;
            // 移动到顶部
            window.scrollTo(0, 0);
            this.current--;
          } else if (data.code === StatusCode.MAILBOX_ERROR) {
            // 与绑定邮箱不符，显示文字提示
            this.flag = StatusCode.MAILBOX_ERROR;
            // 移动到顶部
            window.scrollTo(0, 0);
            this.current--;
          }
          this.disabled = false;
        });
      }
    }else {
      // 修改密码
      if (this.checkVerificationCode() && this.checkMailbox() && this.recheckPassword() && this.checkPassword() && this.checkUsername()) {
        this.loginService.modifyPassword(this.user).subscribe(data => {
          if (data.code === StatusCode.SUCCESS) {
            // 修改密码成功
            this.current++;
            this.modifyPasswordFlag = true;
          } else if (data.code === StatusCode.VERIFICATION_CODE_FAILURE) {
            // 验证码失效
            this.flag = StatusCode.VERIFICATION_CODE_FAILURE;
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.VERIFICATION_CODE_VERIFICATION_FAILED) {
            // 验证码验证失败
            this.flag = StatusCode.VERIFICATION_CODE_VERIFICATION_FAILED;
            window.scrollTo(0, 0);
          } else if (data.code === StatusCode.UNKNOWN_ERROR) {
            // 系统发生未知错误
            this.flag = StatusCode.UNKNOWN_ERROR;
            window.scrollTo(0, 0);
          }
        });
      }
    }
  }

  /**
   * 生成获取验证码表单
   */
  public buildGetVerificationCodeForm(): void {
    this.getVerificationCodeForm = this.fb.group(
      {
        userName: [this.user.userName, [userNameValidator()]],
        mailbox: [this.user.mailbox, [Validators.required, mailboxValidator()]],
      });
  }


  /**
   * 生成修改密码表单
   */
  public buildModifyPasswordForm(): void {
    this.modifyPasswordForm = this.fb.group(
      {
        userName: [this.user.userName, [userNameValidator()]],
        password: [this.user.password, [passwordValidator()]],
        checkPassword: [this.user.checkPassword, [passwordValidator()]],
        mailbox: [this.user.mailbox, [Validators.required, mailboxValidator()]],
        verificationCode: [this.user.verificationCode, [Validators.required, verificationCodeValidator()]]
      });
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
  * 检查两次密码是否相同
  */
  public recheckPassword(): boolean {
    return this.user.password === this.user.checkPassword;
  };

  /**
   * 导航去login界面
   */
   public login(): void {
    this.router.navigate(['/login']);
  }

  /**
   * 导航去首页
   */
  public goToHomepage(): void{
    this.router.navigate(['']);
  }
}


