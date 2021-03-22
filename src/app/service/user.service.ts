import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    private loginService: LoginService) { }

  /**
  * 用于上传文章
  * @param params 文章信息
  */
  public uploadNews(params: any): Observable<any> {
    let news = {
      'userId': params.id,
      'title': params.title,
      'source': params.source,
      'summary': params.summary,
      'article': params.article,
      'type': params.type,
      'img': params.img
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/upload/news', news, {
      withCredentials: true
    });
  }

  /**
 * 用于获取资讯信息
 * @param params 筛选条件
 */
  public getNews(params: any): Observable<any> {
    let condition = {
      'condition': {
        'orderBy': params.condition.orderBy,
        'searchValue': params.condition.searchValue,
        'userId': params.condition.userId
      },
      'curPage': params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/news/getNews', condition, {
      withCredentials: true
    });
  }

  /**
   * 用于上传头像
   * @param params 头像地址
   */
  public uploadImg(params: any): Observable<any> {
    let news = {
      'id': this.loginService.getUserId(),
      'headPortrait': params
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/upload/uploadUserImg', news, {
      withCredentials: true
    });
  }

  /**
   * 用于上传收货地址
   * @param params 收货地址
   */
  public uploadLocation(params: any): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/location/upload', params, {
      withCredentials: true
    });
  }

  /**
   * 用于获取收货地址
   * @param id 用户ID
   */
  public getLocations(id: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/location/lists/' + id, {
      withCredentials: true
    });
  }

  /**
   * 用于删除收货地址
   * @param id 收货地址ID
   */
  public deleteLocationsById(id: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/location/delete/' + id, {
      withCredentials: true
    });
  }

  /**
  * 用于修改收货地址
  * @param id 收货地址信息
  */
  public updateLocationById(params: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/location/update', params, {
      withCredentials: true
    });
  }
}
