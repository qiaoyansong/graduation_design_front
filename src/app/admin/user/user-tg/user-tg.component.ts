import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { AdminService } from 'src/app/service/admin.service';
import { LoginService } from 'src/app/service/login.service';
import { newsSourceValidator, newsTitleValidator } from 'src/app/validator/bussinessValidator';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-tg',
  templateUrl: './user-tg.component.html',
  styleUrls: ['./user-tg.component.scss']
})
export class UserTgComponent implements OnInit {
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
  public news = {
    'id': '',
    'title': '',
    'source': '',
    'summary': '',
    'type': '',
  }

  // 修改标志位
  public flag;
  // 删除标志位
  public deleteFlag;
  //查询文章标志位
  @Output()
  public selectFlags = new EventEmitter<string>();

  // 修改文章标志位
  @Output()
  public upsetFlags = new EventEmitter<string>();

  // 删除文章标志位
  @Output()
  public deleteFlags = new EventEmitter<string>();
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
    this.adminService.getUserNews(condition).subscribe(data => {
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
   * 根据资讯ID获取详细信息
   */
  public getNewInfoById(id: any): void {
    this.router.navigate(['/admin/newsDetail'], { queryParams: { id: id } });
  }

  /**
   * 创建模态框
   * @param tplTitle 
   * @param tplContent 
   * @param tplFooter 
   * @param data 
   */
  public createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>, data: any): void {
    this.news.title = data.title;
    this.news.source = data.source;
    this.news.summary = data.summary;
    this.news.type = data.type;
    this.news.id = data.id;
    this.buildUploadNewsForm();
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
  public buildUploadNewsForm(): void {
    this.uploadNewsForm = this.fb.group(
      {
        title: [this.news.title, [newsTitleValidator()]],
        source: [this.news.source, [newsSourceValidator()]],
        summary: [this.news.summary, [newsSourceValidator()]],
      });
  }

  /**
   * 切换文章类型
   * @param value 文章种类
   */
  public changeNewsType(value: string): void {
    this.news.type = value;
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
    if (this.checkNewsTitle() && this.checkNewsSource() && this.checkNewsSummary()) {
      this.tplModalButtonLoading = true;
      this.adminService.updateNewsByID(this.news).subscribe(data => {
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
        } else if (data.code === StatusCode.NEWS_TITLE_IS_EXISTS) {
          // 文章标题已经存在
          this.flag = StatusCode.NEWS_TITLE_IS_EXISTS;
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
    * 验证文章标题是否符合格式
    */
  public checkNewsTitle(): boolean {
    const value = this.news.title;
    const reg = /^.{1,50}$/;
    const result = reg.test(value);
    return result;
  };

  /**
    * 验证文章来源是否符合格式
    */
  public checkNewsSource(): boolean {
    const value = this.news.source;
    const reg = /^.{1,10}$/;
    const result = reg.test(value);
    return result;
  };

  /**
    * 验证文章摘要是否符合格式
    */
  public checkNewsSummary(): boolean {
    const value = this.news.summary;
    const reg = /^.{1,100}$/;
    const result = reg.test(value);
    return result;
  };
}
