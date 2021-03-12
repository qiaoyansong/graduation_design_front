import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsCheckPipe'
})
export class NewsCheckPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value){
      case 0: return '未审核';
      case 1: return '已通过审核';
      case 2: return '未通过审核';
    }
  }

}
