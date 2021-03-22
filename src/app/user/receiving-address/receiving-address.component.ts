import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { Validators } from '@angular/forms';
import { commoditySummaryValidator, locationNameValidator, locationTelValidator } from 'src/app/validator/bussinessValidator';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { StatusCode } from 'src/app/enumType/StatusCode';
// 城市信息
const options = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          {
            value: 'guanzhuang',
            label: '官庄',
            isLeaf: true
          }
        ]
      },
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          {
            value: 'xisanqi',
            label: '西三旗',
            isLeaf: true
          }
        ]
      },
    ]
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'luwan',
        label: '卢湾区',
        children: [
          {
            value: 'neihuanyinei',
            label: '内环以内',
            isLeaf: true
          }
        ]
      },
      {
        value: 'xuhui',
        label: '徐汇区',
        children: [
          {
            value: 'neihuanyinei',
            label: '内环以内',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    value: 'tianjin',
    label: '天津',
  },
  {
    value: 'chongqing',
    label: '重庆',
  },
  {
    value: 'heibei',
    label: '河北',
  },
  {
    value: 'shanxi',
    label: '山西',
  },
  {
    value: 'henan',
    label: '河南',
  },
  {
    value: 'liaoning',
    label: '辽宁',
  },

];
@Component({
  selector: 'app-receiving-address',
  templateUrl: './receiving-address.component.html',
  styleUrls: ['./receiving-address.component.scss']
})
export class ReceivingAddressComponent implements OnInit {

  // 地址信息
  public location = {
    'userId': '',
    'telephone': '',
    'name': '',
    'province': '',
    'city': '',
    'area': '',
    'location': ''
  }

  // 修改地址信息
  public updateLocation = {
    'id': '',
    'userId': '',
    'telephone': '',
    'name': '',
    'province': '',
    'city': '',
    'area': '',
    'location': ''
  }

  // 上传标志位
  public flag;

  @Output()
  public uploadFlags = new EventEmitter<string>();

  // 删除标志位
  public deleteFlag;
  // 删除收货地址标志位
  @Output()
  public deleteFlags = new EventEmitter<string>();
  public data: any[];

  // 模态框
  public newsModal?: NzModalRef;
  public tplModalButtonLoading = false;
  // 上传收货地址资讯表单
  public uploadLocationForm: FormGroup;
  // 修改收货地址资讯表单
  public updateLocationForm: FormGroup;

  // 修改标志位
  @Output()
  public upsetFlags = new EventEmitter<string>();
  nzOptions: NzCascaderOption[] = options;
  // 地址
  public values: string[] = ['beijing', 'chaoyang', 'guanzhuang'];

  constructor(private modal: NzModalService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private userService: UserService) {
    this.location.userId = this.loginService.getUserId() + '';
    this.userService.getLocations(this.location.userId).subscribe(data => {
      this.data = data.body;
    });
  }

  ngOnInit(): void {
  }

  public modify(): void {

  }

  /**
   * 创建模态框
   * @param tplTitle 
   * @param tplContent 
   * @param tplFooter 
   * @param data 
   */
  public createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>, data?: any): void {
    if (data == null) {
      this.buildUploadLocationForm();
    } else {
      this.buildUpdateLocationForm(data);
    }
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

  /**
  * 构建修改公益资讯表单
  */
  public buildUpdateLocationForm(data: any): void {
    this.updateLocation = data;
    this.values = [this.updateLocation.province, this.updateLocation.city, this.updateLocation.area];
    this.updateLocationForm = this.fb.group(
      {
        telephone: [this.updateLocation.telephone, [Validators.required, locationTelValidator()]],
        name: [this.updateLocation.name, [Validators.required, locationNameValidator()]],
        location: [this.updateLocation.location, [commoditySummaryValidator()]],
      });
  }


  /**
  * 构建上传公益资讯表单
  */
  public buildUploadLocationForm(): void {
    this.location.telephone = '';
    this.location.name = '';
    this.location.location = '';
    this.values = ['beijing', 'chaoyang', 'guanzhuang'];
    this.uploadLocationForm = this.fb.group(
      {
        telephone: [this.location.telephone, [Validators.required, locationTelValidator()]],
        name: [this.location.name, [Validators.required, locationNameValidator()]],
        location: [this.location.location, [commoditySummaryValidator()]],
      });
  }


  /**
   *  添加收货地址
   */
  public addLocation(): void {
    if (this.checkLocationName() && this.checkLocationTel() && this.checkLocation()) {
      // 省
      this.location.province = this.values[0];
      // 市
      this.location.city = this.values[1];
      // 区
      this.location.area = this.values[2];

      this.userService.uploadLocation(this.location).subscribe(data => {
        if (data.code === StatusCode.SUCCESS) {
          // 成功显示提示信息
          this.flag = StatusCode.SUCCESS;
          // 移动到顶部
          window.scrollTo(0, 0);
          this.destroyTplModal();
        } else if (data.code === StatusCode.UNKNOWN_ERROR) {
          this.flag = StatusCode.UNKNOWN_ERROR;
          // 移动到顶部
          window.scrollTo(0, 0);
        }
        this.uploadFlags.emit(this.flag);
      });
    }
  }

  /**
   * 验证收货人姓名是否符合格式
   */
  public checkLocationName(): boolean {
    const value = this.location.name;
    const reg = /^[\u4e00-\u9fa5]{1,10}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 验证收货人手机号码是否符合格式
   */
  public checkLocationTel(): boolean {
    const value = this.location.telephone;
    const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    const result = reg.test(value);
    return result;
  };


  /**
    * 验证具体地址是否符合格式
    */
  public checkLocation(): boolean {
    const value = this.location.location;
    const reg = /^.{0,100}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 验证收货人姓名是否符合格式
   */
  public checkLocationName1(): boolean {
    const value = this.updateLocation.name;
    const reg = /^[\u4e00-\u9fa5]{1,10}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 验证收货人手机号码是否符合格式
   */
  public checkLocationTel1(): boolean {
    const value = this.updateLocation.telephone;
    const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    const result = reg.test(value);
    return result;
  };


  /**
    * 验证具体地址是否符合格式
    */
  public checkLocation1(): boolean {
    const value = this.updateLocation.location;
    const reg = /^.{0,100}$/;
    const result = reg.test(value);
    return result;
  };

  /**
   * 根据资讯ID删除信息
   */
  public deleteLocationsById(id: any): void {
    this.userService.deleteLocationsById(id).subscribe(data => {
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
   * 修改收货地址信息
   */
  public updateLocations(): void {
    if (this.checkLocationName1() && this.checkLocationTel1() && this.checkLocation1()) {
      // 省
      this.updateLocation.province = this.values[0];
      // 市
      this.updateLocation.city = this.values[1];
      // 区
      this.updateLocation.area = this.values[2];
      this.updateLocation.userId = this.loginService.getUserId() + '';
      this.userService.updateLocationById(this.updateLocation).subscribe(data => {
        if (data.code === StatusCode.SUCCESS) {
          // 成功
          this.flag = StatusCode.SUCCESS;
          this.destroyTplModal();
          // 移动到顶部
          window.scrollTo(0, 0);
        } else if (data.code === StatusCode.USER_IS_NOT_LOGGED_IN) {
          // 未登录
          this.flag = StatusCode.USER_IS_NOT_LOGGED_IN;
          // 移动到顶部
          window.scrollTo(0, 0);
        }
        this.upsetFlags.emit(this.flag);
      });
    }
  }
}
