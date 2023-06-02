import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitNumber'
})
export class SplitNumberPipe implements PipeTransform {
  transform(value: any, splitNumber: number = 3, splitStr: string = ','): string {
    // for zero not return
    if (value == undefined) return '';
    
    // init configuration
    let newDigit = '';
    let negative = false;
    value = value.toString().replace(new RegExp(splitStr, "g"), '');
    // value = value.toString().replaceAll(splitStr, '');

    // check negative numbers
    if (value.indexOf('-') !== -1) {
      negative = true;
      value = value.replace(/-/g, '');
    }

    // find length
    let length = value.length;

    for (let i = length - 1, j = 1; i >= 0; i--, j++) {
      newDigit = value[i] + newDigit;
      if (i !== 0 && j % splitNumber === 0)
        newDigit = splitStr + newDigit;
    }
    if (negative) newDigit = '-' + newDigit;
    return newDigit;
  }
}
