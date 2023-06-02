import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterArrayPipe implements PipeTransform {
  transform(arr: any[], searchedText: string, ...props: string[]): any[] {
    // Empty Array
    if (!arr) return [];

    // Empty Searched Text
    if (!searchedText.trim()) return arr;

    // Filter with Search Text
    return arr.filter(arrItem => {
      // Search Inside String
      let searchString = '';

      // Check Props
      if (props?.length) {
        for (let i = 0; i < props.length; i++) {
          searchString += `${arrItem[props[i]]} `;
        };
      }
      else { searchString = arrItem.toString(); }

      // return Result Search
      return searchString.toLocaleLowerCase().includes(searchedText.trim().toLocaleLowerCase());
    });
  }
}
