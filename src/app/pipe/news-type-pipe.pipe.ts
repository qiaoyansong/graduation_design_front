import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsTypePipe'
})
export class NewsTypePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
      switch(value){
        case '0': return '国内';
        case '1': return '政府';
        case '2': return '学校';
        case '3': return '企业';
        case '4': return '益人';
        case '5': return '好人';
        case '6': return '好事';
        case '7': return '评选';
      }
  }

}
