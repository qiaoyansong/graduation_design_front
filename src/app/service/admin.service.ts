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
      'userId': params.id,
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
   * 用于获取资讯信息
   * @param params 筛选条件
   */
  public getActivity(params: any): Observable<any>{
    let condition = {
      'condition' : {
        'orderBy':params.condition.orderBy,
        'searchValue' : params.condition.searchValue
      },
        'curPage':params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/getActivity', condition,{
      withCredentials: true
    });
  }

   /**
   * 用于删除活动信息
   * @param id 活动ID
   */
  public deleteActivityById(id: any): Observable<any>{
    return this.httpClient.get('http://localhost:8080/admin/deleteActivityByID/'+ id, {
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
   * 用于获取资讯信息
   * @param params 筛选条件
   */
  public getAuction(params: any): Observable<any>{
    let condition = {
      'condition' : {
        'orderBy':params.condition.orderBy,
        'searchValue' : params.condition.searchValue
      },
        'curPage':params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/getAuction', condition,{
      withCredentials: true
    });
  }

   /**
   * 用于删除拍卖信息
   * @param id 拍卖ID
   */
  public deleteAuctionById(id: any): Observable<any>{
    return this.httpClient.get('http://localhost:8080/admin/deleteAuctionByID/'+ id, {
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

  /**
   * 用于获取资讯信息
   * @param params 筛选条件
   */
  public getNews(params: any): Observable<any>{
    let condition = {
      'condition' : {
        'orderBy':params.condition.orderBy,
        'searchValue' : params.condition.searchValue
      },
        'curPage':params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/getNews', condition,{
      withCredentials: true
    });
  }

  /**
   * 用于获取商品信息
   * @param params 筛选条件
   */
  public getCommodity(params: any): Observable<any>{
    let condition = {
      'condition' : {
        'orderBy':params.condition.orderBy,
        'searchValue' : params.condition.searchValue
      },
        'curPage':params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/getCommodity', condition,{
      withCredentials: true
    });
  }

   /**
   * 用于获取用户信息
   * @param params 筛选条件
   */
  public getUsers(params: any): Observable<any>{
    let condition = {
      'condition' : {
        'orderBy':params.condition.orderBy,
        'searchValue' : params.condition.searchValue
      },
        'curPage':params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/getUsers', condition,{
      withCredentials: true
    });
  }


  /**
   * 用于删除用户信息
   * @param id 用户ID
   */
  public deleteUserById(id: any): Observable<any>{
    return this.httpClient.get('http://localhost:8080/admin/deleteUserByID/'+ id, {
      withCredentials: true
    });
  }

  /**
   * 用于修改资讯信息
   * @param params 筛选条件
   */
  public updateNewsByID(params: any): Observable<any>{
    let news = {
      'id':params.id,
      'title': params.title,
      'source': params.source,
      'summary': params.summary,
      'type': params.type,
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/updateNews', news,{
      withCredentials: true
    });
  }

  /**
   * 用于删除资讯信息
   * @param id 资讯ID
   */
  public deleteNewsById(id: any): Observable<any>{
    return this.httpClient.get('http://localhost:8080/admin/deleteNewsByID/'+ id, {
      withCredentials: true
    });
  }

  /**
   * 用于删除商品信息
   * @param id 商品ID
   */
  public deleteCommodityById(id: any): Observable<any>{
    return this.httpClient.get('http://localhost:8080/admin/deleteCommodityByID/'+ id, {
      withCredentials: true
    });
  }

  /**
   * 用于修改商品信息
   * @param params 筛选条件
   */
  public updateCommodityByID(params: any): Observable<any>{
    let commodity = {
      'id': params.id,
      'title': params.title,
      'quantity': params.quantity,
      'point': params.point,
      'summary': params.summary,
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/updateCommodity', commodity,{
      withCredentials: true
    });
  }

  /**
   * 用于修改活动信息
   * @param params 筛选条件
   */
  public updateActivityByID(params: any): Observable<any>{
    let activity = {
      "id": params.id,
      'peoples': params.peoples,
      'beginTime': params.beginTime,
      'endTime': params.endTime,
      'difficulty': params.difficulty,
      'title': params.title,
      'summary': params.summary
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/updateActivity', activity,{
      withCredentials: true
    });
  }

  /**
   * 用于修改拍卖信息
   * @param params 筛选条件
   */
  public updateAuctionByID(params: any): Observable<any>{
    let auction = {
      'id': params.id,
      'title': params.title,
      'beginTime': params.beginTime,
      'endTime': params.endTime,
      'minPrice': params.minPrice,
      'maxPrice': params.maxPrice,
      'summary': params.summary,
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/admin/updateAuction', auction,{
      withCredentials: true
    });
  }
}
