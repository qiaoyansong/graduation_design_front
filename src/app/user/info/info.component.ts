import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public user: any;
  // 文字头像颜色列表
  public colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  // 文字头像颜色
  public color;
  // 能否上传图片
  public isDisabled = false;
  // 图片地址
  public imgLocation;
  constructor(private loginService: LoginService,
    private msg: NzMessageService,
    private userService: UserService) {
    this.user = this.loginService.getUser();
    // 每次随机生成颜色 生成[0,3]的随机数
    this.color = this.colorList[Math.floor(Math.random() * 4)];
  }

  ngOnInit(): void {
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
      this.userService.uploadImg(this.imgLocation).subscribe(data => {
        this.loginService.setUser(data.body);
      });
      this.user = this.loginService.getUser();
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 文件上传失败`);
    }
  }
}
