import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enumType/StatusCode';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  // 下拉列表所选条目
  public select: number;

  // 是否内嵌菜单
  public isCollapsed = false;

  // 主题
  public theme = true;
  
  // 上传文章标志位
  public UploadnewsFlag;

  // 上传收货地址标志位
  public UploadLocationsFlag;

  // 修改密码标志位
  public modifyPasswordFlag;

  // 删除收货地址标志位
  public deleteLocationFlag;

  // 修改收货地址标志位
  public updateLocationFlag;

  constructor(private router: Router) {
    this.select = 1;
  }

  ngOnInit(): void {
  }

  /**
   * 内嵌菜单切换按钮
   */
  public toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
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
      this.select = 7;
    } else if (this.UploadnewsFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
   * 从修改密码子组件获取修改密码标志位
   */
   public getModifyPasswordFlag(msg): void {
    this.modifyPasswordFlag = msg;
  }

  /**
   * 从修改密码子组件获取修改密码标志位
   */
   public getUploadLocationsFlag(msg): void {
    this.UploadLocationsFlag = msg;
    if(msg === StatusCode.SUCCESS){
      this.select = 1;
    }
  }

  /**
   * 重置错误标志位
   */
   public afterClose(): void {
    this.UploadnewsFlag = '';
    this.modifyPasswordFlag = '';
    this.UploadLocationsFlag = '';
    this.deleteLocationFlag = '';
  }

  /**
  * 从查询拍卖子组件获取删除拍卖标志位
  */
   public getDeleteLocationFlag(msg): void {
    this.deleteLocationFlag = msg;
    if (this.deleteLocationFlag === StatusCode.SUCCESS) {
      this.select = 1;
    } else if (this.deleteLocationFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }

  /**
  * 从查询拍卖子组件获取删除拍卖标志位
  */
   public getUpdateLocationFlag(msg): void {
    this.updateLocationFlag = msg;
    if (this.updateLocationFlag === StatusCode.SUCCESS) {
      this.select = 1;
    } else if (this.updateLocationFlag === StatusCode.USER_IS_NOT_LOGGED_IN) {
      this.router.navigate(['']);
    }
  }
}
