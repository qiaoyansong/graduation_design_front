import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { LoginService } from 'src/app/service/login.service';
import { newsSourceValidator, newsTitleValidator } from 'src/app/validator/bussinessValidator';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-upload-process',
  templateUrl: './upload-process.component.html',
  styleUrls: ['./upload-process.component.scss']
})
export class UploadProcessComponent implements OnInit {
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
  // 修改标志位
  public flag;
  // 删除标志位
  public deleteFlag;

  // 修改进度标志位
  @Output()
  public upsetFlags = new EventEmitter<string>();
  // 活动进度
  public process;
  // 活动进度表单
  public uploadProcessForm: FormGroup;
  // 用户-活动信息
  public userActivity = {
    'userId': '',
    'activityId': '',
    'progress': 0,
  };
  constructor(private userService: UserService,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private adminService: AdminService) {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.listSortOrderBy = 'ascend';
  }

  public getData(): void {
    // 查询数据 根据当前页数以及排序查看
    let condition = {
      'condition': {
        'orderBy': '',
        'activityId': this.adminService.getActivityId()
      },
      'curPage': ''
    };
    condition.curPage = this.pageIndex + '';
    if (this.listSortOrderBy === 'ascend') {
      condition.condition.orderBy = 'asc';
    } else {
      condition.condition.orderBy = 'desc';
    }
    this.userService.getParticipantByActivityId(condition).subscribe(data => {
      if (data.code === StatusCode.SUCCESS) {
        this.sizeTotal = data.totalSize;
        this.listOfParentData = data.body;
      } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
        this.loginService.removeUser();
        this.router.navigate(['']);
      }
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

  /**
   * 改变页码时
   */
  public changePageIndex(): void {
    this.getData();
  }


  /**
  * 根据活动ID获取详细信息
  */
  public getActivityInfoById(id: any): void {
    this.router.navigate(['/activity'], { queryParams: { id: id } });
  }

  /**
   * 构建上传公益资讯表单
   */
  public buildUploadProcessForm(): void {
    this.adminService.getUserActivityInfo(this.userActivity).subscribe(data => {
      if (data.code === StatusCode.SUCCESS) {
        this.userActivity.progress = data.body.progress;
      } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
        this.loginService.removeUser();
        this.router.navigate(['']);
      };
      this.uploadProcessForm = this.fb.group(
        {
        });
    });
  }

  public createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>, data: any): void {
    this.userActivity.userId = data;
    this.userActivity.activityId = this.adminService.getActivityId();
    this.buildUploadProcessForm();
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
 * 销毁模态框
 */
  public destroyTplModal(): void {
    this.newsModal!.destroy();
  }

  increase(): void {
    this.userActivity.progress = this.userActivity.progress + 10;
    if (this.userActivity.progress > 100) {
      this.userActivity.progress = 100;
    }
  }

  decline(): void {
    this.userActivity.progress = this.userActivity.progress - 10;
    if (this.userActivity.progress < 0) {
      this.userActivity.progress = 0;
    }
  }

   /**
   * 修改进度
   */
    public updateActivityProcess(): void {
      this.adminService.updateActivityProcess(this.userActivity).subscribe(data => {
        if (data.code === StatusCode.SUCCESS) {
          this.userActivity.progress = data.body.progress;
        } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
          this.loginService.removeUser();
          this.router.navigate(['']);
        };
        this.upsetFlags.emit(data.code);
        this.destroyTplModal();
      });
    }
}
