import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { LoginService } from 'src/app/service/login.service';
import { mailboxValidator, passwordValidator, userNameValidator, verificationCodeValidator } from 'src/app/validator/bussinessValidator';
@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {

  // 当前步骤
  public current = 0;

  // 登录获取验证码表单
  public getVerificationCodeForm: FormGroup;

  // 验证验证码表单
  public verificationCodeForm: FormGroup;

  // 修改密码表单
  public modifyPasswordForm: FormGroup;

  // 下一步是否可选标志位 false 代表可选
  public disabled = false;

  // 登录标志位
  public flag: string;

  // 是否修改密码成功
  public modifyPasswordFlag = false;

  // 修改密码标志位
  @Output()
  public uploadFlags = new EventEmitter<string>();

  public user = {
    'userName': '',
    'mailbox': '',
    'verificationCode': '',
    'password': '',
    'checkPassword': ''
  };

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,) {
    this.user.userName = this.loginService.getUserName();
    this.user.mailbox = this.loginService.getMailBox();
  }

  ngOnInit(): void {
    this.buildGetVerificationCodeForm();
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
      this.disabled = true;
      this.buildModifyPasswordForm();
      if (this.checkMailbox() && this.checkUsername()) {
        this.loginService.modifyPasswordGetVerificationCode(this.user).subscribe(data => {
          if (data.code === StatusCode.CREATE_VERIFICATION_CODE_COMPLETE) {
            this.current += 1;
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
            this.current += 1;
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
          this.uploadFlags.emit(this.flag);
          this.disabled = false;
        });
      }
    } else {
      // 修改密码
      if (this.checkVerificationCode() && this.checkMailbox() && this.recheckPassword() && this.checkPassword() && this.checkUsername()) {
        this.loginService.modifyPassword(this.user).subscribe(data => {
          if (data.code === StatusCode.SUCCESS) {
            // 修改密码成功
            this.current++;
            // 请求退出操作
            this.modifyPasswordFlag = true;
            this.logout();
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
          this.uploadFlags.emit(this.flag);
        });
      }
    }
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
  public goToHomepage(): void {
    this.router.navigate(['']);
  }

  /**
   * 退出登录
   */
  public logout(): void {
    // 请求退出操作
    this.loginService.logout(this.user.userName).subscribe(data => {
        this.loginService.removeUser();
    }
    );
  }
}
