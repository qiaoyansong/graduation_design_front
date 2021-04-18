import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deliver'
})
export class DeliverPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);
    switch(value){
      case 0: return '未发货';
      case 1: return '已发货';
    }
  }

}
