import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private httpClient: HttpClient) { }

  /**
   * 用于获取资讯
   */
   public getListOfHomepageGuoNei(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/home/list/guonei',{
      withCredentials: true
    });
  }

  /**
   * 用于获取资讯
   */
   public getListOfHomepageZhengFu(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/home/list/zhengfu',{
      withCredentials: true
    });
  }

  /**
   * 用于获取资讯
   */
   public getListOfHomepageXueXiao(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/home/list/xuexiao',{
      withCredentials: true
    });
  }

  /**
   * 用于获取资讯
   */
   public getListOfHomepageQiYe(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/home/list/qiye',{
      withCredentials: true
    });
  }

  /**
   * 用于获取资讯
   */
   public getListOfHomepageYiRen(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/home/list/yiren',{
      withCredentials: true
    });
  }

  /**
   * 用于获取资讯
   */
   public getListOfHomepageHaoRen(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/home/list/haoren',{
      withCredentials: true
    });
  }

  /**
   * 用于获取资讯
   */
   public getListOfHomepageHaoShi(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/home/list/haoshi',{
      withCredentials: true
    });
  }

  /**
   * 用于获取资讯
   */
   public getListOfHomepagePingXuan(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/home/list/pingxuan',{
      withCredentials: true
    });
  }
}
