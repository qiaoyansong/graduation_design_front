import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { AdminService } from 'src/app/service/admin.service';
import { newsSourceValidator, newsSummaryValidator, newsTitleValidator } from 'src/app/validator/bussinessValidator';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-upload-news',
  templateUrl: './upload-news.component.html',
  styleUrls: ['./upload-news.component.scss']
})
export class UploadNewsComponent implements OnInit {
  // 文章
  public news = {
    'title': '',
    'source': '',
    'summary': '',
    'article': '',
    'type': '',
    'img': ''
  }
  // 上传的数据
  public data: any;
  // 图片地址
  public imgLocation;
  // 上传公益资讯表单
  public uploadNewsForm: FormGroup;
  // 能否上传图片
  public isDisabled = false;
  // 上传标志位
  public flag;
  // 上传文章标志位
  @Output()
  public uploadFlags = new EventEmitter<string>();
  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private msg: NzMessageService) {
    this.news.type = '0';
    this.buildUploadNewsForm();
  }

  /**
   * 构建上传公益资讯表单
   */
  public buildUploadNewsForm(): void {
    this.uploadNewsForm = this.fb.group(
      {
        title: [this.news.title, [newsTitleValidator()]],
        source: [this.news.source, [newsSourceValidator()]],
        summary: [this.news.summary, [newsSummaryValidator()]],
      });
    this.isDisabled = false;
  }

  ngOnInit(): void {
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
   * 切换文章类型
   * @param value 文章种类
   */
  public changeNewsType(value: string): void {
    this.news.type = value;
  }

  /**
    * 验证文章标题是否符合格式
    */
  public checkNewsTitle(): boolean {
    const value = this.news.title;
    const reg = /^[\u4e00-\u9fa5]{1,20}$/;
    const result = reg.test(value);
    return result;
  };

  /**
    * 验证文章来源是否符合格式
    */
  public checkNewsSource(): boolean {
    const value = this.news.source;
    const reg = /^[\u4e00-\u9fa5]{1,10}$/;
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

  /**
    * 验证列表图片是否符合格式
    */
  public checkListImage(): boolean {
    return this.imgLocation == null ? false : true;;
  };

  /**
   * 验证富文本编辑器内容是否符合格式
   */
  public checkData(): boolean {
    return this.data == null ? false : true;;
  };

  /**
   * 上传文章
   */
  public uploadNews(): void {
    if (this.checkNewsTitle() && this.checkData() && this.checkListImage() && this.checkNewsSource() && this.checkNewsSummary()) {
      this.news.article = this.data;
      this.news.img = this.imgLocation;
      this.adminService.uploadNews(this.news).subscribe(data => {
        if (data.code === StatusCode.SUCCESS) {
          // 成功
          this.news.type = '0';
          this.news.article = '';
          this.data = null;
          this.news.img = '';
          this.news.source = '';
          this.news.title = '';
          this.news.summary = '';
          this.imgLocation = null;
          this.buildUploadNewsForm();
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
        console.log(data);
        this.uploadFlags.emit(this.flag);
      });
    }
  }

  /**
 * 上传公益资讯列表图片
 * @param info 
 */
  handleNewsImagChange(info: NzUploadChangeParam): void {
    if (info.fileList.length == 0) {
      this.isDisabled = false;
    }
    if (info.file.status === 'done' && info.file.response.fileName != null) {
      this.msg.success(`${info.file.name} 文件上传成功`);
      this.isDisabled = true;
      // 图片存放地址
      this.imgLocation = "http://localhost:8080/upload/pic/" + info.file.response.location;
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 文件上传失败`);
    }
  }
}
