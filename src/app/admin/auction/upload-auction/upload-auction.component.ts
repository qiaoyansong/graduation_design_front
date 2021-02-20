import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { commoditySummaryValidator, newsTitleValidator } from 'src/app/validator/bussinessValidator';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from 'src/app/service/admin.service';
import { StatusCode } from 'src/app/enumType/StatusCode';
@Component({
  selector: 'app-upload-auction',
  templateUrl: './upload-auction.component.html',
  styleUrls: ['./upload-auction.component.scss']
})
export class UploadAuctionComponent implements OnInit {

  // 上传公益拍卖商品表单
  public uploadAuctionForm: FormGroup;
  // 上传的数据
  public data: any;
  // 公益拍卖商品
  public auction = {
    'title': '',
    'content': '',
    'beginTime': '',
    'endTime': '',
    'minPrice': '',
    'maxPrice': '',
    'img': '',
    'summary': '',
  }
  // 最低价格
  public minPrice = 1;
  // 最高价格
  public maxPrice = 1;
  // 所需点数
  public point = 1;
  // 能否上传图片
  public isDisabled = false;
  // 图片地址
  public imgLocation;
  // 上传标志位
  public flag;
  // 开始、结束时间
  dateRange = [];
  // 上传拍卖标志位
  @Output()
  public uploadFlags = new EventEmitter<string>();
  constructor(private fb: FormBuilder,
    private msg: NzMessageService,
    private adminService: AdminService) {
    this.buildUploadAuctionForm();
  }

  ngOnInit(): void {
  }


  /**
   * 构建上传公益拍卖商品表单
   */
  public buildUploadAuctionForm(): void {
    this.uploadAuctionForm = this.fb.group(
      {
        title: [this.auction.title, [newsTitleValidator()]],
        summary: [this.auction.summary, [commoditySummaryValidator()]],
      });
    this.isDisabled = false;
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
  * 上传公益商品列表图片
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

  /**
    * 验证商品标题是否符合格式
    */
  public checkNewsTitle(): boolean {
    const value = this.auction.title;
    const reg = /^[\u4e00-\u9fa5]{1,50}$/;
    const result = reg.test(value);
    return result;
  };

  /**
    * 验证商品摘要是否符合格式
    */
  public checkNewsSummary(): boolean {
    const value = this.auction.summary;
    const reg = /^.{0,100}$/;
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
   * 验证开始结束时间是否符合格式
   */
  public checkBeginAndEndTime(): boolean {
    return this.dateRange == null ? false : 
    (this.dateRange[0] == null || this.dateRange[1] == null)? false: true;
  };

  /**
   * 上传公益拍卖
   */
  public uploadAuction(): void {
    if(this.checkData() && this.checkListImage() && this.checkNewsSummary() && this.checkNewsTitle() && this.checkBeginAndEndTime()){
        this.auction.content = this.data;
        this.auction.beginTime = this.dateRange[0];
        this.auction.endTime = this.dateRange[1];
        this.auction.minPrice = this.minPrice + '';
        this.auction.maxPrice = this.maxPrice + '';
        this.auction.img = this.imgLocation;
        this.adminService.uploadAuction(this.auction).subscribe(data => {
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
