import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { newsTitleValidator, newsSourceValidator,newsSummaryValidator } from 'src/app/validator/bussinessValidator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
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
  // 当前页数
  public pageIndex: number;
  // 当前数据条数
  public sizeTotal: number;
  // 结果链表升序、降序排序
  public listSortOrderBy = 'asc';
  // 查询数据
  public searchValue: '';
  // 下拉列表所选条目
  public select: number;
  // 上传公益资讯表单
  public uploadNewsForm: FormGroup;
  // 上传的数据
  public data: any;
  // 能否上传图片
  public isDisabled = false;
  // 图片地址
  public imgLocation;
  // 文章类型
  public newsType = "0";
  // 文章
  public news = {
    'title': '',
    'source': '',
    'summary': '',
    'article': '',
    'type': '',
    'img':''
  }
  /**
   * 内嵌菜单切换按钮
   */
  public toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(private fb: FormBuilder,
    private msg: NzMessageService) {
    this.pageIndex = 1;
    this.sizeTotal = 500;
    this.select = 1;
  }

  ngOnInit(): void {
  }

  /**
   * 分页查询数据
   */
  public selectData(): void{
    console.log('查询数据');
  }

  /**
   * 改变链表排序方式
   */
  public changeOrder(value: string): void{
    this.listSortOrderBy = value;
    console.log(this.listSortOrderBy);
  }

  /**
   * 根据下拉列表获取对应内容
   * @param value 下拉列表
   */
  public getInfo(value: number): void{
    this.select = value;
    if(this.select === 4){
      this.buildLoginForm();
    }
  }

  /**
   * 构建上传公益资讯表单
   */
  public buildLoginForm(): void {
    this.uploadNewsForm = this.fb.group(
      {
        title: [this.news.title, [newsTitleValidator()]],
        source: [this.news.source, [newsSourceValidator()]],
        summary: [this.news.summary, [newsSummaryValidator()]],
      });
      this.isDisabled = false;
  }

  /**
   * 上传列表图片
   * @param info 
   */
  handleChange(info: NzUploadChangeParam): void {
    console.log(info);
    if(info.fileList.length == 0){
      this.isDisabled = false;
    }
    if (info.file.status === 'done' && info.file.response.fileName != null) {
      this.msg.success(`${info.file.name} 文件上传成功`);
      this.isDisabled = true;
      // 图片存放地址
      this.imgLocation = "http://localhost:8080/upload/pic/" + info.file.response.location;
      console.log(this.imgLocation);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 文件上传失败`);
    }
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
  public checkNewsTitle() : boolean{
    const value = this.news.title;
    const reg = /^[\u4e00-\u9fa5]{1,20}$/;
    const result = reg.test(value);
    return result;
  };

 /**
   * 验证文章来源是否符合格式
   */
  public checkNewsSource() : boolean{
    const value = this.news.source;
    const reg = /^[\u4e00-\u9fa5]{1,10}$/;
    const result = reg.test(value);
    return result;
  };

 /**
   * 验证文章摘要是否符合格式
   */
  public checkNewsSummary() : boolean{
    const value = this.news.summary;
    const reg = /^.{1,100}$/;
    const result = reg.test(value);
    return result;
  };

 /**
   * 验证列表图片是否符合格式
   */
  public checkListImage() : boolean{
    return this.imgLocation == null? false: true;;
  };

  /**
   * 验证富文本编辑器内容是否符合格式
   */
  public checkData() : boolean{
    return this.data == null? false: true;;
  };

  /**
   * 上传文章
   */
  public uploadNews(): void{
    if(this.checkNewsTitle() && this.checkData() && this.checkListImage() && this.checkNewsSource() && this.checkNewsSummary()){
      this.news.article = this.data;
      this.news.img = this.imgLocation;
    }
  }
} 
