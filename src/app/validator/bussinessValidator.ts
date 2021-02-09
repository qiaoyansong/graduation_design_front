import { ValidatorFn, AbstractControl } from '@angular/forms';

export function quantityValidator(): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any}| null => {
    const value = control.value;
    const isN = isNaN(Number(value) && parseInt(value));
    let result: boolean;
    if (!isN){
      if (Number(value) >= 1)
      {
        result = true;
      }
      else result = false;
    }
    return result ? null : {'business' : {name: value}};
  };
}

/**
 * 验证用户名是否符合格式
 */
export function userNameValidator(): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any}| null => {
    const value = control.value;
    const reg = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;
    const result = reg.test(value);
    return result ? null : {'userName' : {name: value}} ;
  };
}

/**
 * 验证密码是否符合格式
 */
export function passwordValidator(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any}| null => {
      const value = control.value;
      const reg = /^[a-zA-Z]\w{9,19}$/;
      const result = reg.test(value);
      return result ? null : {'password' : {name: value}} ;
    };
}

/**
 * 验证邮箱是否符合格式
 */
export function mailboxValidator(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any}| null => {
      const value = control.value;
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const result = reg.test(value);
      return result ? null : {'mailbox' : {name: value}} ;
    };
}

/**
 * 验证验证码是否符合格式
 */
export function verificationCodeValidator(): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any}| null => {
    const value = control.value;
    const reg = /^\d{6}$/;
    const result = reg.test(value);
    return result ? null : {'verificationCode' : {name: value}} ;
  };
}