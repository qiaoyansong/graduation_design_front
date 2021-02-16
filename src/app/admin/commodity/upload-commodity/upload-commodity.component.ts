import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { commoditySummaryValidator, newsTitleValidator } from 'src/app/validator/bussinessValidator';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-upload-commodity',
  templateUrl: './upload-commodity.component.html',
  styleUrls: ['./upload-commodity.component.scss']
})
export class UploadCommodityComponent implements OnInit {

  // 上传公益商品表单
  public uploadCommodityForm: FormGroup;
  // 上传的数据
  public data: any;
  // 公益商品
  public commodity = {
    'title': '',
    'content': '',
    'img': '',
    'quantity': '',
    'point': '',
    'summary': '',
  }
  // 剩余数量
  public quantity = 1;
  // 所需点数
  public point = 1;
  // 能否上传图片
  public isDisabled = false;
  // 图片地址
  public imgLocation;
  constructor(private fb: FormBuilder,
    private msg: NzMessageService) { 
      this.buildUploadCommodityForm();
    }

  ngOnInit(): void {
  }


  /**
   * 构建上传公益资讯表单
   */
  public buildUploadCommodityForm(): void {
    this.uploadCommodityForm = this.fb.group(
      {
        title: [this.commodity.title, [newsTitleValidator()]],
        summary: [this.commodity.summary, [commoditySummaryValidator()]],
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
      console.log(this.imgLocation);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 文件上传失败`);
    }
  }

  /**
    * 验证商品标题是否符合格式
    */
   public checkNewsTitle(): boolean {
    const value = this.commodity.title;
    const reg = /^[\u4e00-\u9fa5]{1,20}$/;
    const result = reg.test(value);
    return result;
  };

  /**
    * 验证商品摘要是否符合格式
    */
  public checkNewsSummary(): boolean {
    const value = this.commodity.summary;
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
   * 上传公益商品
   */
  public uploadCommodity(): void {

  }
}
