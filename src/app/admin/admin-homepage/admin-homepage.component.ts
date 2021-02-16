import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { newsTitleValidator, newsSourceValidator,newsSummaryValidator } from 'src/app/validator/bussinessValidator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AdminService } from 'src/app/service/admin.service';
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
  }
} 
