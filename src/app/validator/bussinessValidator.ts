import { ValidatorFn, AbstractControl } from '@angular/forms';

export function quantityValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isN = isNaN(Number(value) && parseInt(value));
    let result: boolean;
    if (!isN) {
      if (Number(value) >= 1) {
        result = true;
      }
      else result = false;
    }
    return result ? null : { 'business': { name: value } };
  };
}

/**
 * 验证用户名是否符合格式
 */
export function userNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;
    const result = reg.test(value);
    return result ? null : { 'userName': { name: value } };
  };
}

/**
 * 验证密码是否符合格式
 */
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^[a-zA-Z]\w{9,19}$/;
    const result = reg.test(value);
    return result ? null : { 'password': { name: value } };
  };
}

/**
 * 验证邮箱是否符合格式
 */
export function mailboxValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const result = reg.test(value);
    return result ? null : { 'mailbox': { name: value } };
  };
}

/**
 * 验证验证码是否符合格式
 */
export function verificationCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^\d{6}$/;
    const result = reg.test(value);
    return result ? null : { 'verificationCode': { name: value } };
  };
}

/**
 * 验证文章标题是否符合格式
 */
export function newsTitleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^[\u4e00-\u9fa5]{1,50}$/;
    const result = reg.test(value);
    return result ? null : { 'newsTitle': { name: value } };
  };
}
/**
 * 验证文章来源是否符合格式
 */
export function newsSourceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^[\u4e00-\u9fa5]{1,10}$/;
    const result = reg.test(value);
    return result ? null : { 'newsSource': { name: value } };
  };
}
/**
 * 验证文章摘要是否符合格式
 */
export function newsSummaryValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^.{1,100}$/;
    const result = reg.test(value);
    return result ? null : { 'newsSummary': { name: value } };
  };
}
/**
* 验证商品摘要是否符合格式
*/
export function commoditySummaryValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^.{0,100}$/;
    const result = reg.test(value);
    return result ? null : { 'commoditySummary': { name: value } };
  };
}

/**
 * 验证收货人姓名是否符合格式
*/
export function locationNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^[\u4e00-\u9fa5]{1,10}$/;
    const result = reg.test(value);
    return result ? null : { 'locationName': { name: value } };
  };
}

/**
 * 验证收货人手机号码是否符合格式
*/
export function locationTelValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    const result = reg.test(value);
    return result ? null : { 'locationTel': { name: value } };
  };
}