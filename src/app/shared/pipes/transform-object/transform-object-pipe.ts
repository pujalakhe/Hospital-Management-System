import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformObject',
})
export class TransformObjectPipe implements PipeTransform {
  transform(obj: any): any {
    if (!obj) return obj;
    if ('key' in obj && 'value' in obj) {
      return {
        id: obj.key,
        name: obj.value,
      };
    }
    if ('id' in obj && 'name' in obj) {
      return obj;
    }
    return obj;
  }
}
