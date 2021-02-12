import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  // 存储登录用户用户名
  private userName: any;
  // 判断用户是否登录
  private isLogIn = false;

  /**
   * 设置已经登录用户的用户名
   * @param userName 用户信息
   */
  public setUserName(userName: any):void{
    this.userName = userName;
    this.isLogIn = true;
  }

  /**
   * 获取用户
   */
  public getUserName(): any{
    return this.userName;
  }

  /**
   * 移除用户
   */
  public removeUserName(): any{
    this.userName = null;
    this.isLogIn = false;
  }

  /**
   * 是否登录
   */
  public isLogin(): boolean{
    return this.isLogIn;
  }

  /**
   * 用于用户登录
   * @param user 用户信息
   */
  public login(user: any): Observable<any>{
    let param =  {
      "userName":user.userName,
      "password": user.password
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/login', param,{
      withCredentials: true
    });
  }

  /**
   * 退出登录
   * @param userName 退出登录用户名
   */
  public logout(userName: any): Observable<any>{
    return this.httpClient.get('http://localhost:8080/logout/'+userName, {
      withCredentials: true
    });
  }

  /**
   * 刷新界面后获取用户信息
   */
  public getSaveInfo(): Observable<any>{
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true，与此同时要想RequestHeader中包含SessionID，只能使用get方式
    return this.httpClient.get('http://localhost:8080/getSaveInfo',{
      withCredentials: true
    });
  }

  /**
   * 用于管理员登录获取验证码
   * @param user 用户信息
   */
  public adminLoginGetVerificationCode(user: any): Observable<any>{
    let param =  {
      "userName":user.userName,
      "password": user.password,
      'mailbox': user.mailbox
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/login/admin/getVerificationCode', param,{
      withCredentials: true
    });
  }

}
