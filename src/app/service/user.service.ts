import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

   /**
   * 用于上传文章
   * @param params 文章信息
   */
    public uploadNews(params: any): Observable<any>{
      let news =  {
        'userId': params.id,
        'title': params.title,
        'source': params.source,
        'summary': params.summary,
        'article': params.article,
        'type': params.type,
        'img':params.img
      }
      // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
      return this.httpClient.post('http://localhost:8080/upload/news', news,{
        withCredentials: true
      });
    }

    /**
   * 用于获取资讯信息
   * @param params 筛选条件
   */
  public getNews(params: any): Observable<any>{
    let condition = {
      'condition' : {
        'orderBy':params.condition.orderBy,
        'searchValue' : params.condition.searchValue,
        'userId': params.condition.userId
      },
        'curPage':params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/news/getNews', condition,{
      withCredentials: true
    });
  }
}
