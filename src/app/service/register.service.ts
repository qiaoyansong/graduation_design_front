import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }
  /**
   * 用于请求后台发送验证码接口
   * @param params 邮箱
   */
  public getVerificationCode(params: any): Observable<any>{
    let mailBox = new HttpParams();
    mailBox = mailBox.append('mailBox',params);
    return this.httpClient.post('http://localhost:8080/register/getVerificationCode', mailBox);
  }

  /**
   * 注册新用户
   * @param user 注册用户信息
   */
  public register(user: any): Observable<any>{
    const register = {
      'userName': user.userName,
      'password': user.password,
      'mailbox':  user.mailbox,
      'verificationCode': user.verificationCode
    }
    return this.httpClient.post('http://localhost:8080/register/register', register,{
      withCredentials: true
    });
  } 
}
