import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidden'
})
export class HiddenArrayPipe implements PipeTransform {
  constructor(private cdr: ChangeDetectorRef) { }
  transform(arr: any[], searchedText: string, props: string[] = [], hiddenField: string = '_hide') {
    // Empty Array
    if (!arr) return [];

    // Empty Searched Text
    if (!searchedText.trim()) {
      arr.forEach(arrItem => arrItem[hiddenField] = false);
    }

    // Filter with Search Text
    arr.forEach(arrItem => {
      // Search Inside String
      let searchString = '';

      // Check Props
      if (props?.length) {
        for (let i = 0; i < props.length; i++) {
          searchString += `${arrItem[props[i]]} `;
        };
      }
      else { searchString = arrItem.toString(); }

      // Result Search
      if (searchString.toLocaleLowerCase().includes(searchedText.trim().toLocaleLowerCase()))
        arrItem[hiddenField] = false;
      else
        arrItem[hiddenField] = true;
    });
    setTimeout(() => this.cdr.detectChanges());
    return arr.slice(2);
  }
}
