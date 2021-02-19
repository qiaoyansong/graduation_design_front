import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusComponent } from 'ng-devui';
import { StatusCode } from 'src/app/enumType/StatusCode';
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
  // 上传公益拍卖表单
  public uploadAuctionForm: FormGroup;
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
  // 修改资讯标志位
  public updateNewsFlag;
  // 删除资讯标志位
  public deleteNewsFlag;
  // 查看商品标志位
  public SearchCommodityFlag;
  // 修改商品标志位
  public updateCommodityFlag;
  // 删除商品标志位
  public deleteCommodityFlag;
  // 用户未登录
  public isNotLogin = false;
  /**
   * 内嵌菜单切换按钮
   */
  public toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(private router: Router) {
    this.select = 1;
  }


  ngOnInit(): void {
  }

  /**
   * 根据下拉列表获取对应内容
   * @param value 下拉列表
   */
  public getInfo(value: number): void{
    this.select = value;
  }

  /**
   * 从上传文章子组件获取上传标志位
   */
  public getUploadNewsFlag(msg): void{
    this.UploadnewsFlag = msg;
    if(this.UploadnewsFlag === StatusCode.SUCCESS){
      this.select = 5;
    }else if(this.UploadnewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
  }

  /**
   * 从上传活动子组件获取上传标志位
   */
  public getUploadActivityFlag(msg): void{
    this.UploadActivityFlag = msg;
    if(this.UploadActivityFlag === StatusCode.SUCCESS){
      this.select = 7;
    }else if(this.UploadActivityFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
  }

  /**
   * 从上传拍卖子组件获取上传标志位
   */
  public getUploadAuctionFlag(msg): void{
    this.UploadAuctionFlag = msg;
    if(this.UploadAuctionFlag === StatusCode.SUCCESS){
      this.select = 11;
    }else if(this.UploadAuctionFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
  }

  /**
   * 从上传商品子组件获取上传标志位
   */
  public getUploadCommodityFlag(msg): void{
    this.UploadCommodityFlag = msg;
    if(this.UploadCommodityFlag === StatusCode.SUCCESS){
      this.select = 9;
    }else if(this.UploadCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
  }

  /**
   * 从查询资讯子组件获取查看标志位
   */
  public getSearchNewsFlag(msg): void{
    if(this.SearchNewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
    this.SearchNewsFlag = msg;
  }

  /**
   * 从查询资讯子组件获取修改资讯标志位
   */
  public getUpsetNewsFlag(msg): void{
    this.updateNewsFlag = msg;
    if(this.updateNewsFlag === StatusCode.SUCCESS){
      this.select = 4;
    }else if(this.updateNewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
  }

  /**
   * 从查询资讯子组件获取删除资讯标志位
   */
  public getDeleteNewsFlag(msg): void{
    this.deleteNewsFlag = msg;
    if(this.deleteNewsFlag === StatusCode.SUCCESS){
      this.select = 4;
    }else if(this.deleteNewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
  }

  /**
   * 从查询商品子组件获取查看标志位
   */
  public getSearchCommodityFlag(msg): void{
    if(this.SearchCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
    this.SearchCommodityFlag = msg;
  }

  /**
   * 从查询商品子组件获取修改资讯标志位
   */
  public getUpdateCommodityFlag(msg): void{
    this.updateCommodityFlag = msg;
    if(this.updateCommodityFlag === StatusCode.SUCCESS){
      this.select = 8;
    }else if(this.updateCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
  }

  /**
   * 从查询商品子组件获取删除商品标志位
   */
  public getDeleteCommodityFlag(msg): void{
    this.deleteCommodityFlag = msg;
    if(this.deleteCommodityFlag === StatusCode.SUCCESS){
      this.select = 8;
    }else if(this.deleteCommodityFlag === StatusCode.USER_IS_NOT_LOGGED_IN){
      this.router.navigate(['']);
    }
  }

  /**
   * 重置错误标志位
   */
  public afterClose(): void{
    this.UploadnewsFlag = '';
    this.UploadActivityFlag = '';
    this.UploadAuctionFlag = '';
    this.UploadCommodityFlag = '';
    this.SearchNewsFlag = '';
  }
} 
