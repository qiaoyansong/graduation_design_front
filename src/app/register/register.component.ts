import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mailboxValidator, passwordValidator, userNameValidator, verificationCodeValidator } from '../validator/bussinessValidator';
import { RegisterService } from '../service/register.service';
import { StatusCode } from '../enumType/StatusCode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // 注册表单
  public registerForm: FormGroup;

  // 验证验证码表单
  public verificationCodeForm: FormGroup;

  public user = {
    'userName':'',
    'password':'',
    'checkPassword': '',
    'mailbox': '',
    'verificationCode': ''
  };
  constructor(private languageService: LanguageService, 
    private translate: TranslateService, 
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
    ) { 
    this.translate.use('zh');
    // 生成表单
    this.buildRegisterForm();
  }
  
  public buildRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        userName: [this.user.userName, [userNameValidator()]],
        password: [this.user.password, [passwordValidator()]],
        checkPassword: [this.user.checkPassword, [passwordValidator()]],
        mailbox: [this.user.mailbox, [Validators.required, mailboxValidator()]],
      });
  }

  public buildVerificationCodeForm(): void {
    this.verificationCodeForm = this.fb.group(
      {
        mailbox: [this.user.mailbox],
        verificationCode: [this.user.verificationCode, [Validators.required, verificationCodeValidator()]]
      });
  }

  ngOnInit(): void {
  }

  // 语言
  public language: string;

  // 当前步骤
  public current = 0;

  // 请求验证码服务返回的code信息
  public flag: string;

  // 下一步是否可选标志位 false 代表可选
  public disabled = false;

  // 是否注册成功
  public registerFlag = false;

  // 错误信息
  public errorMsg: string;

  //注册界面展示图片
  public array = ['http://localhost:8080/register/1.jpg',
  'http://localhost:8080/register/2.jpg',
  'http://localhost:8080/register/3.jpg'];

  public changeLanguage(value: string): void {
    this.languageService.setLanguage(value);
    this.language = value;
    this.translate.use(this.language);
  }


  /**
   * 返回上一步
   */
  pre(): void {
    this.current -= 1;
    this.disabled = false;
  }

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

  /**
   * 导航去注册界面
   */
  public register(): void{
    this.current = 0;
  }

  next(num: number): void {
    if(num === 1){
      // 检测表单信息
      if(this.checkMailbox() && this.recheckPassword() && this.checkPassword() && this.checkUsername()){
        this.disabled = true;
        this.registerService.getVerificationCode(this.user.mailbox).subscribe(data => {
          if(data.code === StatusCode.CREATE_VERIFICATION_CODE_COMPLETE){
            // 发送验证码成功，显示文字提示
              this.flag = StatusCode.CREATE_VERIFICATION_CODE_COMPLETE;
              // 移动到顶部
              window.scrollTo(0, 0);
              this.current += 1;
              this.buildVerificationCodeForm();
            }else if(data.code === StatusCode.SEND_EMAIL_FAILED){
              // 发送验证码邮件失败，显示文字提示
              this.flag = StatusCode.SEND_EMAIL_FAILED;
            }else if(data.code === StatusCode.VERIFICATION_CODE_NOT_EXPIRED){
              // 验证码并没有失效，显示文字提示
              this.flag = StatusCode.VERIFICATION_CODE_NOT_EXPIRED;
              // 移动到顶部
              window.scrollTo(0, 0);
              this.current += 1;
              this.buildVerificationCodeForm();
            }
            this.disabled = false;
        });
      }
    }else{
      // 检验验证码表单
      if(this.checkVerificationCode()){
        // 验证码格式正确
        this.registerService.register(this.user).subscribe(data => {
          if(data.code === StatusCode.SUCCESS){
            // 成功
            this.registerFlag = true;
          }else if(data.code === StatusCode.VERIFICATION_CODE_FAILURE){
            // 验证码失效
            this.errorMsg = '验证码失效';
          }else if(data.code === StatusCode.VERIFICATION_CODE_VERIFICATION_FAILED){
            // 验证码验证失败
            this.errorMsg = '验证码错误';
          }else if(data.code === StatusCode.USERNAME_IS_EXISTS){
            // 用户名已经存在
            this.errorMsg = '用户名已经存在';
          }else if(data.code === StatusCode.MAILBOX_IS_EXISTS){
            // 邮箱已经存在
            this.errorMsg = '邮箱已经存在';
          }else if(data.code === StatusCode.UNKNOWN_ERROR){
            // 系统发生未知错误
            this.errorMsg = '系统发生未知错误';
          }
        });
        // 移动到顶部
        window.scrollTo(0, 0);
        this.current += 1;
      }
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
   * 检查邮箱格式是否正确
   */
  public checkMailbox() : boolean{
    const value = this.user.mailbox;
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
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
   * 检查两次密码是否相同
   */
  public recheckPassword() : boolean{
    return this.user.password === this.user.checkPassword;
  };

  /**
   * 检查验证码格式是否正确
   */
  public checkVerificationCode() : boolean {
    const value = this.user.verificationCode;
    const reg = /^\d{6}$/;
    const result = reg.test(value);
    return result;
  }

}
