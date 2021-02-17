import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  /**
   * 内嵌菜单切换按钮
   */
  public toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor() {
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
    }
  }

  /**
   * 从上传活动子组件获取上传标志位
   */
  public getUploadActivityFlag(msg): void{
    this.UploadActivityFlag = msg;
    if(this.UploadActivityFlag === StatusCode.SUCCESS){
      this.select = 7;
    }
  }

  /**
   * 从上传拍卖子组件获取上传标志位
   */
  public getUploadAuctionFlag(msg): void{
    this.UploadAuctionFlag = msg;
    if(this.UploadAuctionFlag === StatusCode.SUCCESS){
      this.select = 11;
    }
  }

  /**
   * 从上传商品子组件获取上传标志位
   */
  public getUploadCommodityFlag(msg): void{
    this.UploadCommodityFlag = msg;
    if(this.UploadCommodityFlag === StatusCode.SUCCESS){
      this.select = 9;
    }
  }
} 
