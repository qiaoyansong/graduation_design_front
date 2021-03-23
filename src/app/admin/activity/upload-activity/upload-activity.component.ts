import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { AdminService } from 'src/app/service/admin.service';
import { commoditySummaryValidator, newsSummaryValidator,} from 'src/app/validator/bussinessValidator';
import { NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
@Component({
  selector: 'app-upload-activity',
  templateUrl: './upload-activity.component.html',
  styleUrls: ['./upload-activity.component.scss']
})
export class UploadActivityComponent implements OnInit {

  // 活动
  public activity = {
		'peoples' : '',
		'beginTime' : '',
		'endTime': '',
		'difficulty': '',
		'title' : '',
		'content': '',
		'summary': '',
  }
  // 上传的数据
  public data: any;
  // 上传公益活动表单
  public uploadActivityForm: FormGroup;
  // 上传标志位
  public flag;
  // 开始、结束时间
  dateRange = [];
  // 人数
  peoples = 1;
  // 上传活动标志位
  @Output()
  public uploadFlags = new EventEmitter<string>();
  // 难度等级
  public value = 1;
  tooltips = ['简单', '有点难', '难', '困难', '艰难'];
  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private i18n: NzI18nService) {
    this.buildUploadActivityForm();
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

  ngOnInit(): void {
    this.i18n.setLocale(zh_CN);
  }

  // 富文本编辑器
  tinyInit = {
    height: 500,
    menubar: 'file edit view',
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    gecko_spellcheck: false,
    file_browser_callback_types: 'image',
    language: 'zh_CN',
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | table | image | help',
    images_upload_handler(blobInfo, succFun, failFun) {
      let xhr: XMLHttpRequest;
      let formData: FormData;
      xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8080/upload/pic', true);
      formData = new FormData();
      formData.append('file', blobInfo.blob());
      xhr.onload = () => {
        let json;
        if (xhr.status !== 200) {
          failFun('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        // location就是json返回的图片地址返回的数据必须含有location字段
        if (!json || typeof json.location !== 'string') {
          failFun('上传成功');
          return;
        }
        succFun("http://localhost:8080/upload/pic/" + json.location);
      };
      xhr.send(formData);
    }
  }

  /**
   * 验证活动标题是否符合格式
   */
  public checkActivityTitle(): boolean {
    const value = this.activity.title;
    const reg = /^.{1,100}$/;
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
   * 验证富文本编辑器内容是否符合格式
   */
  public checkData(): boolean {
    return this.data == null ? false : true;;
  };

  /**
   * 验证开始结束时间是否符合格式
   */
  public checkBeginAndEndTime(): boolean {
    return this.dateRange == null ? false : 
    (this.dateRange[0] == null || this.dateRange[1] == null)? false: true;
  };

  /**
   * 上传活动
   */
  public uploadActivity(): void {
    if(this.checkData() && this.checkActivitySummary() && this.checkActivityTitle() && this.checkBeginAndEndTime()){
      this.activity.content = this.data;
      this.activity.difficulty = this.value + '';
      this.activity.peoples = this.peoples + '';
      this.activity.beginTime = this.dateRange[0];
      this.activity.endTime = this.dateRange[1];
      this.adminService.uploadActivity(this.activity).subscribe(data => {
        if(data.code === StatusCode.SUCCESS){
          this.flag = StatusCode.SUCCESS;
          // 移动到顶部
          window.scrollTo(0, 0);
        } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
          // 未登录
          this.flag = StatusCode.USER_IS_NOT_LOGGED_IN;
          // 移动到顶部
          window.scrollTo(0, 0);
        }
        this.uploadFlags.emit(this.flag);
      });
    }
  }
}
