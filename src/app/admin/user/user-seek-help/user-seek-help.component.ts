import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { LoginService } from 'src/app/service/login.service';
import { newsSourceValidator, newsTitleValidator } from 'src/app/validator/bussinessValidator';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/service/user.service';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-user-seek-help',
  templateUrl: './user-seek-help.component.html',
  styleUrls: ['./user-seek-help.component.scss']
})
export class UserSeekHelpComponent implements OnInit {
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
  // 上传公益资讯表单
  public uploadNewsForm: FormGroup;
  // 模态框
  public newsModal?: NzModalRef;

  public tplModalButtonLoading = false;

  // 文章
  public news = {}

  // 修改标志位
  public flag;
  // 删除标志位
  public deleteFlag;
  @Output()
  public selectFlags = new EventEmitter<string>();

  @Output()
  public upsetFlags = new EventEmitter<string>();

  constructor(private userService: UserService,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private modal: NzModalService,) {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.listSortOrderBy = 'ascend';
  }

  public getData(): void {
    // 查询数据 根据当前页数以及排序查看
    let condition = {
      'condition': {
        'orderBy': '',
        'searchValue': '',
        'userId':'',
        'flag': null
      },
      'curPage': ''
    };
    condition.condition.userId = this.loginService.getUser().userId;
    condition.condition.searchValue = this.searchValue;
    condition.curPage = this.pageIndex + '';
    if (this.listSortOrderBy === 'ascend') {
      condition.condition.orderBy = 'asc';
    } else {
      condition.condition.orderBy = 'desc';
    }
    this.userService.seekHelpList(condition).subscribe(data => {
      if (data.code === StatusCode.SUCCESS) {
        this.sizeTotal = data.totalSize;
        this.listOfParentData = data.body;
      } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
        this.loginService.removeUser();
        this.router.navigate(['']);
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
  public expandSet = new Set<number>();
  public onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
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
   * 根据求助ID获取求助详细信息
   */
  public getSeekHelpInfoById(id: any): void {
    this.router.navigate(['/admin/seekHelpDetail'], { queryParams: { id: id } });
  }
}
