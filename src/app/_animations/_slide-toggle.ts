import { animate, state, style, transition } from '@angular/animations';

export class AnimationSlide {
  static Up() {}
  static Down() {}
  static Auto(speed: number = 400) {
    return [
      state(
        'void',
        style({
          height: '0',
          margin: '0',
          padding: '0',
          overflow: 'hidden'
        })
      ),
      transition('* <=> void', animate(speed)),
    ];
  }
}
