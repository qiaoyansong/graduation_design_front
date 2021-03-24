import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusCode } from 'src/app/enumType/StatusCode';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { newsTitleValidator } from 'src/app/validator/bussinessValidator';

@Component({
  selector: 'app-seek-help',
  templateUrl: './seek-help.component.html',
  styleUrls: ['./seek-help.component.scss']
})
export class SeekHelpComponent implements OnInit {

  // 上传的数据
  public data: any;
  public help = {
    'userId':'',
    'title':'',
    'content':''
  };
  // 求助表单
  public seekHelpForm: FormGroup;
  // 求助标志位
  @Output()
  public uploadFlags = new EventEmitter<string>();
  // 求助标志位
  public flag;
  constructor(private loginService: LoginService,
    private fb: FormBuilder,
    private userService: UserService) {
    this.help.userId = this.loginService.getUserId() + '';
    this.buildSeekHelpForm();
   }

  ngOnInit(): void {
  }

/**
   * 上传求助
   */
 public submit(): void {
  if (this.checkSeekHelpTitle() && this.checkData()) {
    this.help.content = this.data;
    console.log(this.help);
    // 开始业务逻辑
    this.userService.seekHelp(this.help).subscribe(data => {
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
      this.uploadFlags.emit(this.flag);
    });
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
  * 验证富文本编辑器内容是否符合格式
  */
  public checkData(): boolean {
    return this.data == null ? false : true;;
  };

  /**
   * 验证求助标题是否符合格式
   */
   public checkSeekHelpTitle(): boolean {
    const value = this.help.title;
    const reg = /^.{1,100}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 构建求助表单
   */
   public buildSeekHelpForm(): void {
    this.seekHelpForm = this.fb.group(
      {
        title: [this.help.title, [newsTitleValidator()]],
      });
  }
}
