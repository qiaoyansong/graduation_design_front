import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  
  /**
   * 用于上传文章
   * @param params 文章信息
   */
  public uploadNews(params: any): Observable<any>{
    let news =  {
      'title': params.title,
      'source': params.source,
      'summary': params.summary,
      'article': params.article,
      'type': params.type,
      'img':params.img
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/uploadNews', news,{
      withCredentials: true
    });
  }

  /**
   * 用于上传活动
   * @param params 文章信息
   */
  public uploadActivity(params: any): Observable<any>{
    let activity = {
      'peoples' : params.peoples,
      'beginTime' : params.beginTime,
      'endTime': params.endTime,
      'difficulty': params.difficulty,
      'title' : params.title,
      'content': params.content,
      'summary': params.summary,
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/uploadActivity', activity,{
      withCredentials: true
    });
  }
  /**
   * 用于上传拍卖
   * @param params 拍卖信息
   */
  public uploadAuction(params: any): Observable<any>{
    let auction = {
      'title': params.title,
      'content': params.content,
      'beginTime': params.beginTime,
      'endTime': params.endTime,
      'minPrice': params.minPrice,
      'maxPrice': params.maxPrice,
      'img': params.img,
      'summary': params.summary,
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/uploadAuction', auction,{
      withCredentials: true
    });
  }
  /**
   * 用于上传商品
   * @param params 商品信息
   */
  public uploadCommodity(params: any): Observable<any>{
    let commodity = {
      'title': params.title,
      'content': params.content,
      'img': params.img,
      'quantity': params.quantity,
      'point': params.point,
      'summary': params.summary,
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/uploadCommodity', commodity,{
      withCredentials: true
    });
  }
}
