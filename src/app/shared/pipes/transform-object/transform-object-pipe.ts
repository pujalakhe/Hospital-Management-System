import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../model/role.model';

@Pipe({
  name: 'transformRole',
})
export class TransformRolePipe implements PipeTransform {
  transform(response: Role[]): { id: number; name: string }[] {
    return response.map((item: Role) => ({
      id: item.key,
      name: item.value,
    }));
  }
}
