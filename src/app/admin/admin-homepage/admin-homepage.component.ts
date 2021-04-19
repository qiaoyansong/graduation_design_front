import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusComponent } from 'ng-devui';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { AdminService } from 'src/app/service/admin.service';
@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss']
})
export class AdminHomepageComponent implements OnInit {
  // 是否内嵌菜单
  public isCollapsed = false;
  // 主题
  public theme = true;
  // 下拉列表所选条目
  public select: number;
  // 上传文章标志位
  public UploadnewsFlag;
  // 上传文章标志位
  public UploadActivityFlag;
  // 上传拍卖标志位
  public UploadAuctionFlag;
  // 上传商品标志位
  public UploadCommodityFlag;
  // 查看资讯标志位
  public SearchNewsFlag;
  // 查看活动标志位
  public SearchActivityFlag;
  // 查看拍卖标志位
  public SearchAuctionFlag;
  // 修改资讯标志位
  public updateNewsFlag;
  // 删除资讯标志位
  public deleteNewsFlag;
  // 删除活动标志位
  public deleteActivityFlag;
  // 删除拍卖标志位
  public deleteAuctionFlag;
  // 查看商品标志位
  public SearchCommodityFlag;
  // 修改商品标志位
  public updateCommodityFlag;
  // 修改活动标志位
  public updateActivityFlag;
  // 修改拍卖标志位
  public updateAuctionFlag;
  // 删除商品标志位
  public deleteCommodityFlag;
  // 查询用户标志位
  public SearchUserFlag;
  // 删除用户标志位
  public deleteUserFlag;
  // 用户未登录
  public isNotLogin = false;
  // 用户修改信息标志位
  public updateUserInfoFlag;
  // 查询参数校验失败
  public searchFlag = false;
  // 修改用户参与活动进度标志位
  public updateActivityProcessFlag;
  // 用户兑换商品发货标志位
  public deliverCommodityFlag;
  // 用户拍得商品发货标志位
  public deliverAuctionFlag;
  // 活动ID
  @Output()
  public activityId = new EventEmitter<string>();
  /**
   * 内嵌菜单切换按钮
   */
  public toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(private router: Router,
    private adminService: AdminService) {
    this.select = 1;
  }


  ngOnInit(): void {
  }

  /**
   * 根据下拉列表获取对应内容
   * @param value 下拉列表
   */
  public getInfo(value: number): void {
    this.select = value;
  }

  /**
   * 从上传文章子组件获取上传标志位
   */
  public getUploadNewsFlag(msg): void {
    this.UploadnewsFlag = msg;
    if (this.UploadnewsFlag === StatusCode.SUCCESS) {
      this.select = 5;
    } else if (this.UploadnewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 从上传活动子组件获取上传标志位
   */
  public getUploadActivityFlag(msg): void {
    this.UploadActivityFlag = msg;
    if (this.UploadActivityFlag === StatusCode.SUCCESS) {
      this.select = 7;
    } else if (this.UploadActivityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 从上传拍卖子组件获取上传标志位
   */
  public getUploadAuctionFlag(msg): void {
    this.UploadAuctionFlag = msg;
    if (this.UploadAuctionFlag === StatusCode.SUCCESS) {
      this.select = 11;
    } else if (this.UploadAuctionFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 从上传商品子组件获取上传标志位
   */
  public getUploadCommodityFlag(msg): void {
    this.UploadCommodityFlag = msg;
    if (this.UploadCommodityFlag === StatusCode.SUCCESS) {
      this.select = 9;
    } else if (this.UploadCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 从查询资讯子组件获取查看标志位
   */
  public getSearchNewsFlag(msg): void {
    this.SearchNewsFlag = msg;
    if (this.SearchNewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    } else if (this.SearchNewsFlag == StatusCode.VALID_EXCEPTION) {
      this.searchFlag = true;
    }
  }

  /**
   * 从查询资讯子组件获取修改资讯标志位
   */
  public getUpsetNewsFlag(msg): void {
    this.updateNewsFlag = msg;
    if (this.updateNewsFlag === StatusCode.SUCCESS) {
      this.select = 4;
    } else if (this.updateNewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 获取修改用户参与活动进度
   */
  public getUpdateActivityProcessFlag(msg): void {
    this.updateActivityProcessFlag = msg;
    if (this.updateActivityProcessFlag === StatusCode.SUCCESS) {
      this.select = 7;
    } else if (this.updateActivityProcessFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 获取修改用户信息标志位
   */
  public getUpdateUserInfoFlag(msg): void {
    this.updateUserInfoFlag = msg;
    if (this.updateUserInfoFlag === StatusCode.SUCCESS) {
      this.select = 2;
    } else if (this.updateUserInfoFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 从查询资讯子组件获取删除资讯标志位
   */
  public getDeleteNewsFlag(msg): void {
    this.deleteNewsFlag = msg;
    if (this.deleteNewsFlag === StatusCode.SUCCESS) {
      this.select = 4;
    } else if (this.deleteNewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 获取删除用户标志位
   */
  public getDeleteUserFlag(msg): void {
    this.deleteUserFlag = msg;
    if (this.deleteUserFlag === StatusCode.SUCCESS) {
      this.select = 2;
    } else if (this.deleteUserFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 从查询商品子组件获取查看标志位
   */
  public getSearchCommodityFlag(msg): void {
    this.SearchCommodityFlag = msg;
    if (this.SearchCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    } else if (this.SearchCommodityFlag === StatusCode.VALID_EXCEPTION) {
      this.searchFlag = true;
    }
  }

  /**
   * 从查询活动子组件获取查看标志位
   */
  public getSearchActivityFlag(msg): void {
    this.SearchActivityFlag = msg;
    if (this.SearchActivityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    } else if (this.SearchActivityFlag === StatusCode.VALID_EXCEPTION) {
      this.searchFlag = true;
    }
  }

  /**
   * 从查询拍卖子组件获取查看标志位
   */
  public getSearchAuctionFlag(msg): void {
    this.SearchAuctionFlag = msg;
    if (this.SearchAuctionFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    } else if (this.SearchAuctionFlag === StatusCode.VALID_EXCEPTION) {
      this.searchFlag = true;
    }
  }

  /**
   * 获取用户查看标志位
   */
  public getSearchUserFlag(msg): void {
    this.SearchUserFlag = msg;
    if (this.SearchUserFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    } else if (this.SearchUserFlag === StatusCode.VALID_EXCEPTION) {
      this.searchFlag = true;
    }
  }

  /**
   * 从查询商品子组件获取修改资讯标志位
   */
  public getUpdateCommodityFlag(msg): void {
    this.updateCommodityFlag = msg;
    if (this.updateCommodityFlag === StatusCode.SUCCESS) {
      this.select = 8;
    } else if (this.updateCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 获取修改活动标志位
   */
  public getUpdateActivityFlag(msg): void {
    this.updateActivityFlag = msg;
    if (this.updateActivityFlag === StatusCode.SUCCESS) {
      this.select = 6;
    } else if (this.updateActivityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 获取修改拍卖标志位
   */
  public getUpdateAuctionFlag(msg): void {
    this.updateAuctionFlag = msg;
    if (this.updateAuctionFlag === StatusCode.SUCCESS) {
      this.select = 10;
    } else if (this.updateAuctionFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 从查询商品子组件获取删除商品标志位
   */
  public getDeleteCommodityFlag(msg): void {
    this.deleteCommodityFlag = msg;
    if (this.deleteCommodityFlag === StatusCode.SUCCESS) {
      this.select = 8;
    } else if (this.deleteCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
  * 从查询活动子组件获取删除活动标志位
  */
  public getDeleteActivityFlag(msg): void {
    this.deleteActivityFlag = msg;
    if (this.deleteActivityFlag === StatusCode.SUCCESS) {
      this.select = 6;
    } else if (this.deleteActivityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
  * 从查询拍卖子组件获取删除拍卖标志位
  */
  public getDeleteAuctionFlag(msg): void {
    this.deleteAuctionFlag = msg;
    if (this.deleteAuctionFlag === StatusCode.SUCCESS) {
      this.select = 10;
    } else if (this.deleteAuctionFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
 * 获取到活动ID
 */
  public getActivityId(msg): void {
    this.select = 12;
    this.adminService.setActivityId(msg);
  }

  /**
   * 获取用户兑换商品发货标志为
   */
   public getDeliverCommodityFlag(msg): void {
    this.deliverCommodityFlag = msg;
    if (this.deliverCommodityFlag === StatusCode.SUCCESS) {
      this.select = 9;
    } else if (this.deliverCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 获取用户拍得商品发货标志为
   */
   public getDeliverAuctionFlag(msg): void {
    this.deliverAuctionFlag = msg;
    if (this.deliverAuctionFlag === StatusCode.SUCCESS) {
      this.select = 11;
    } else if (this.deliverAuctionFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 重置错误标志位
   */
  public afterClose(): void {
    this.UploadnewsFlag = '';
    this.UploadActivityFlag = '';
    this.UploadAuctionFlag = '';
    this.UploadCommodityFlag = '';
    this.SearchNewsFlag = '';
    this.SearchActivityFlag = '';
    this.SearchAuctionFlag = '';
    this.SearchUserFlag = '';
    this.updateNewsFlag = '';
    this.deleteNewsFlag = '';
    this.deleteActivityFlag = '';
    this.deleteAuctionFlag = '';
    this.SearchCommodityFlag = '';
    this.updateCommodityFlag = '';
    this.updateActivityFlag = '';
    this.updateAuctionFlag = '';
    this.deleteCommodityFlag = '';
    this.deleteUserFlag = '';
    this.isNotLogin = false;
    this.searchFlag = false;
    this.updateUserInfoFlag = '';
    this.updateActivityProcessFlag = '';
    this.deliverAuctionFlag = '';
    this.deliverCommodityFlag = '';
  }
}
