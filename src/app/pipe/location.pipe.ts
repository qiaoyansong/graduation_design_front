import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value){
      case 'beijing': return '北京';
      case 'chaoyang': return '朝阳区';
      case 'haidian': return '海淀区';
      case 'guanzhuang': return '官庄';
      case 'shanghai': return '上海';
      case 'luwan': return '卢湾区';
      case 'neihuanyinei': return '内环以内';
      case 'xuhui': return '徐汇区';
      case 'tianjin': return '天津';
      case 'chongqing': return '重庆';
      case 'heibei': return '河北';
      case 'shanxi': return '山西';
      case 'henan': return '河南';
      case 'liaoning': return '辽宁';
      case 'xisanqi': return '西三旗';
    }
  }

}
