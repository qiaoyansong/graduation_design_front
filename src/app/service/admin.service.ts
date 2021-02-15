import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpClient: any;

  constructor() { }
  
  /**
   * 用于上传文章
   * @param params 文章信息
   */
  public login(params: any): Observable<any>{
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
}
