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
 * 用于获取资讯信息
 * @param params 筛选条件
 */
  public getNews2(params: any): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/news/newsList', params, {
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

  /**
  * 用于用户求助申请
  * @param id 收货地址信息
  */
  public seekHelp(params: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/seekHelp/submit', params, {
      withCredentials: true
    });
  }

  /**
  * 用于用户求助申请
  * @param id 收货地址信息
  */
  public seekHelpList(params: any): Observable<any> {
    let condition = {
      'condition': {
        'orderBy': params.condition.orderBy,
        'searchValue': params.condition.searchValue,
        'userId': params.condition.userId,
      },
      'curPage': params.curPage
    }
    return this.httpClient.post('http://localhost:8080/seekHelp/listall', condition, {
      withCredentials: true
    });
  }

  /**
 * 查看具体的求助信息
 * @param id 求助信息ID
 */
  public getSeekHelpInfoById(id: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/seekHelp/getDetail/' + id, {
      withCredentials: true
    });
  }

  /**
 * 查看具体的求助信息
 * @param id 求助信息ID
 */
   public getSeekHelpInfoById0(id: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/seekHelpList/getSeekHelpInfoById/' + id, {
      withCredentials: true
    });
  }

  /**
 * 用于获取资讯详情
 * @param id 资讯ID
 */
  public getNewInfoById(id: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/news/getNewInfoById/' + id, {
      withCredentials: true
    });
  }

  /**
   * 用于追加文章评论
   * @param params 收货地址
   */
  public addArticleReview(params: any): Observable<any> {
    console.log(params)
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/news/addArticleReview', params, {
      withCredentials: true
    });
  }

  /**
   * 用于获取文章评论
   * @param params 收货地址
   */
  public getArticleReviews(params: any): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/news/getArticleReviews', params, {
      withCredentials: true
    });
  }

  /**
   * 用于获取文章评论
   * @param params 收货地址
   */
  public getLastedNews(): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.get('http://localhost:8080/news/getLastedNews', {
      withCredentials: true
    });
  }

  /**
   * 用于获取文章评论
   * @param params 收货地址
   */
  public getHotNews(): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.get('http://localhost:8080/news/getHotNews', {
      withCredentials: true
    });
  }

  /**
   * 用于获取商品信息
   * @param params 筛选条件
   */
  public getCommodity(params: any): Observable<any> {
    let condition = {
      'condition': {
        'orderBy': params.condition.orderBy,
      },
      'curPage': params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/commodity/commodityList', condition, {
      withCredentials: true
    });
  }


  /**
   * 用于获取资讯信息
   * @param params 筛选条件
   */
  public getActivity(params: any): Observable<any> {
    let condition = {
      'condition': {
        'orderBy': params.condition.orderBy,
      },
      'curPage': params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/activity/activityList', condition, {
      withCredentials: true
    });
  }

  /**
 * 用于获取商品详情
 * @param id 商品ID
 */
  public getCommodityInfoById(id: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/commodity/getCommodityInfoById/' + id, {
      withCredentials: true
    });
  }

  /**
 * 用于获取活动详情
 * @param id 活动ID
 */
  public getActivityInfoById(id: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/activity/getActivityInfoById/' + id, {
      withCredentials: true
    });
  }

  /**
   * 用于报名活动
   * @param params 筛选条件
   */
  public signUp(params: any): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/user/signUp', params, {
      withCredentials: true
    });
  }

  /**
  * 查看当前用户参加的所有活动
  * @param 筛选信息
  */
  public getActivityProcessByUserId(params: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/user/getActivityProcessByUserId', params, {
      withCredentials: true
    });
  }

  /**
 * 查看当前用户参加的所有活动
 * @param 筛选信息
 */
  public getParticipantByActivityId(params: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/user/getParticipantByActivityId', params, {
      withCredentials: true
    });
  }

  /**
 * 用于获取拍卖列表
 * @param params 筛选条件
 */
  public auctionList(params: any): Observable<any> {
    let condition = {
      'condition': {
        'orderBy': params.condition.orderBy,
      },
      'curPage': params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/auction/auctionList', condition, {
      withCredentials: true
    });
  }

  /**
 * 根据拍卖ID查看拍卖详情
 * @param 筛选信息
 */
  public getAuctionInfoById(params: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/auction/getAuctionInfoById/' + params, {
      withCredentials: true
    });
  }

  /**
 * 根据拍卖ID查看价格实时变化
 * @param 筛选信息
 */
  public getAuctionRealtimePrice(params: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/auction/getAuctionRealtimePrice/' + params, {
      withCredentials: true
    });
  }

  /**
 * 拍卖加价的逻辑
 * @param 加价价格
 */
   public offer(auctionRealtimePrice: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/user/offer', auctionRealtimePrice, {
      withCredentials: true
    });
  }
  
  /**
  * 查看当前用户参加的所有拍卖
  * @param 筛选信息
  */
   public getAuctionProcessByUserId(params: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/user/getAuctionProcessByUserId', params, {
      withCredentials: true
    });
  }

  /**
 * 根据拍卖ID查看最高价格
 * @param 筛选信息
 */
   public getMaxAuctionRealtimePrice(params: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/auction/getMaxAuctionRealtimePrice/' + params, {
      withCredentials: true
    });
  }

  /**
   * 用于获取求助信息
   * @param params 筛选条件
   */
   public getSeekHelp(params: any): Observable<any> {
    let condition = {
      'condition': {
        'orderBy': params.condition.orderBy,
        'flag': params.condition.flag
      },
      'curPage': params.curPage
    }
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/seekHelpList/seekHelpList', condition, {
      withCredentials: true
    });
  }

  /**
   * 根据用户ID获取地址信息
   * @param params 筛选条件
   */
   public getAddressListByUserId(params: any): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/user/getAddressListByUserId', params, {
      withCredentials: true
    });
  }

  /**
   * 兑换商品
   * @param params 参数
   */
   public exchangeCommodity(params: any): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/user/exchangeCommodity', params, {
      withCredentials: true
    });
  }

  /**
   * 获取用户兑换的商品列表
   * @param params 参数
   */
   public getExchangeCommodityListByUserId(params: any): Observable<any> {
    // 为了防止每次sessionID都改变必须设置为true，而且后台也必须设置为true
    return this.httpClient.post('http://localhost:8080/user/getExchangeCommodityListByUserId', params, {
      withCredentials: true
    });
  }
}
