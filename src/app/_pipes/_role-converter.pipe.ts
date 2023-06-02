import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleConverter'
})
export class RoleConverterPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) return 'ADMIN';
    value = value.toString().toLowerCase();

    if (value.includes('admin')) return 'ADMIN';
    else if (value.includes('rm')) return 'RM';
    else if (value.includes('dm')) return 'DM';
    else if (value.includes('3')) return 'AM1';
    else if (value.includes('4')) return 'AM2';
    else if (value.includes('5')) return 'AM3';
    else return 'ADMIN';

  }

}
