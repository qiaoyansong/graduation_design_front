import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';
import { commoditySummaryValidator, newsSourceValidator, newsSummaryValidator, newsTitleValidator } from 'src/app/validator/bussinessValidator';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-see-activity',
  templateUrl: './see-activity.component.html',
  styleUrls: ['./see-activity.component.scss']
})
export class SeeActivityComponent implements OnInit {

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
  // 开始、结束时间
  dateRange = [];
  // 上传公益活动表单
  public uploadActivityForm: FormGroup;
  // 模态框
  public newsModal?: NzModalRef;

  public tplModalButtonLoading = false;
  public tooltips = ['简单', '有点难', '难', '困难', '艰难'];
  // 活动
  public activity = {
    "id": '',
    'peoples': '',
    'beginTime': '',
    'endTime': '',
    'difficulty': '',
    'title': '',
    'summary': '',
  }

  // 修改标志位
  public flag;
  // 删除标志位
  public deleteFlag;
  // 难度等级
  public value = 1;
  //查询文章标志位
  @Output()
  public selectFlags = new EventEmitter<string>();

  // 修改文章标志位
  @Output()
  public upsetFlags = new EventEmitter<string>();

  // 删除文章标志位
  @Output()
  public deleteFlags = new EventEmitter<string>();

  // 活动ID
  @Output()
  public activityId = new EventEmitter<string>();
  constructor(private adminService: AdminService,
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
    this.adminService.getActivity(condition).subscribe(data => {
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
   * 根据资讯ID删除信息
   */
  public deleteNewsById(id: any): void {
    this.adminService.deleteActivityById(id).subscribe(data => {
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

  /**
   * 根据活动ID管理进度信息
   * @param id 活动ID
   */
  public updateActivityProcess(id: any): void {
    this.activityId.emit(id);
  }

  /**
   * 创建模态框
   * @param tplTitle 
   * @param tplContent 
   * @param tplFooter 
   * @param data 
   */
  public createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>, data: any): void {
    this.activity.id = data.id;
    this.activity.peoples = data.peoples;
    this.activity.title = data.title;
    this.activity.summary = data.summary;
    this.dateRange = [];
    this.dateRange.push(data.beginTime);
    this.dateRange.push(data.endTime);
    this.value = data.difficulty;
    this.buildUploadActivityForm();
    this.newsModal = this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        value: 'Template Context'
      },
    });
  }

  /**
    * 构建上传公益资讯表单
    */
  public buildUploadActivityForm(): void {
    this.uploadActivityForm = this.fb.group(
      {
        title: [this.activity.title, [newsSummaryValidator()]],
        summary: [this.activity.summary, [commoditySummaryValidator()]],
      });
  }


  /**
   * 销毁模态框
   */
  public destroyTplModal(): void {
    this.newsModal!.destroy();
  }

  /**
   * 提交更新
   */
  public commitUpdate(): void {
    if (this.checkActivityTitle() && this.checkActivitySummary() && this.checkBeginAndEndTime()) {
      this.tplModalButtonLoading = true;
      // 设置难度
      this.activity.difficulty = this.value + '';
      // 设置开始结束时间
      this.activity.beginTime = this.dateRange[0];
      this.activity.endTime = this.dateRange[1];
      this.adminService.updateActivityByID(this.activity).subscribe(data => {
        if (data.code === StatusCode.SUCCESS) {
          // 成功
          this.flag = StatusCode.SUCCESS;
          // 移动到顶部
          window.scrollTo(0, 0);
        } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
          // 未登录
          this.flag = StatusCode.USER_IS_NOT_LOGGED_IN;
          // 移动到顶部
          window.scrollTo(0, 0);
        }
        this.tplModalButtonLoading = false;
        this.upsetFlags.emit(this.flag);
        this.destroyTplModal();
      });
    }
  }

  /**
   * 验证活动标题是否符合格式
   */
  public checkActivityTitle(): boolean {
    const value = this.activity.title;
    const reg = /^.{1,50}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 验证活动摘要是否符合格式
   */
  public checkActivitySummary(): boolean {
    const value = this.activity.summary;
    const reg = /^.{0,100}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 验证开始结束时间是否符合格式
   */
  public checkBeginAndEndTime(): boolean {
    return this.dateRange == null ? false :
      (this.dateRange[0] == null || this.dateRange[1] == null) ? false : true;
  };
}
