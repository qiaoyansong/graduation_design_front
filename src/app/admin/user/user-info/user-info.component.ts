import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';
import { commoditySummaryValidator , newsSummaryValidator } from 'src/app/validator/bussinessValidator';
import { TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  
  // 当前页数
  public pageIndex: number;
  // 当前每页的数据条数
  public pageSize: number;
  // 当前数据条数
  public sizeTotal: number;
  // 结果链表升序、降序排序
  public listSortOrderBy;
  // 查询数据
  public searchValue: '';
  // 控制搜索框是否显示
  public visible = false;
  // 数据
  public listOfParentData;
  // 是否登录标志位
  public isLoginFlag;
  public errorFlag = '';

  public tplModalButtonLoading = false;
  // 用户
  public user = {
    "id": '',
    'userName': '',
    'mailbox': '',
    'credit': '',
    'point': '',
  }

  // 修改标志位
  public flag;
  // 删除标志位
  public deleteFlag;
  //查询用户标志位
  @Output()
  public selectFlags = new EventEmitter<string>();

  // 删除用户标志位
  @Output()
  public deleteFlags = new EventEmitter<string>();
  constructor(private adminService: AdminService,
    private router: Router,
    private loginService: LoginService) {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.listSortOrderBy = 'ascend';
  }

  public getData(): void {
    // 查询数据 根据当前页数以及排序查看
    let condition = {
      'condition': {
        'orderBy': '',
        'searchValue': ''
      },
      'curPage': ''
    };
    condition.condition.searchValue = this.searchValue;
    condition.curPage = this.pageIndex + '';
    if (this.listSortOrderBy === 'ascend') {
      condition.condition.orderBy = 'asc';
    } else {
      condition.condition.orderBy = 'desc';
    }
    this.adminService.getUsers(condition).subscribe(data => {
      if (data.code === StatusCode.SUCCESS) {
        this.sizeTotal = data.totalSize;
        this.listOfParentData = data.body;
      } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
        this.loginService.removeUser();
        this.router.navigate(['/admin/login']);
      } else if (data.code == StatusCode.VALID_EXCEPTION) {
        // 参数校验错误
        this.errorFlag = StatusCode.VALID_EXCEPTION;
      }
      this.selectFlags.emit(this.errorFlag);
    });
  }
  
  ngOnInit(): void {
    this.getData();
  }

  /**
   * 改变链表排序方式
   */
  public changeOrder(value: string): void {
    if (value == null) {
      // 默认支持 ascend descend null三种，当前是为了忽略null值
      value = 'ascend';
    }
    this.listSortOrderBy = value;
    this.getData();
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }
  /**
   * 搜索
   */
  search(): void {
    this.visible = false;
    this.getData();
  }
  /**
   * 改变页码时
   */
  public changePageIndex(): void {
    this.getData();
  }

  /**
   * 根据用户ID删除信息
   */
  public deleteNewsById(id: any): void {
    this.adminService.deleteUserById(id).subscribe(data => {
      if (data.code === StatusCode.SUCCESS) {
        // 成功
        this.deleteFlag = StatusCode.SUCCESS;
        // 移动到顶部
        window.scrollTo(0, 0);
      } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
        // 未登录
        this.deleteFlag = StatusCode.USER_IS_NOT_LOGGED_IN;
        // 移动到顶部
        window.scrollTo(0, 0);
      }
      this.deleteFlags.emit(this.deleteFlag);
    });
  }

}
