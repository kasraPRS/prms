import { Pipe, PipeTransform } from '@angular/core';

// Get Second and Return 'HH:MM:SS' || 'MM:SS' || 'SS'
@Pipe({ name: 'toMinute' })
export class SecondToHourPipe implements PipeTransform {
  transform(
    value: number,
    format: 'HH:MM:SS' | 'MM:SS' | 'SS' = 'MM:SS'
  ): string {
    if (!value) return '';

    let hour = Math.floor(value / 3600).toString();
    let minute = Math.floor(value / 60).toString();
    let second = (value % 60).toString();

    return (
      (minute ? `${minute.length < 2 ? '0' + minute : minute}:` : '00:') +
      (second ? `${second.length < 2 ? '0' + second : second}` : '00')
    );
  }
}
