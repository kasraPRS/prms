import { ElementRef, Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService implements OnInit {
  // Private properties
  private el: ElementRef;
  private renderer: Renderer2;
  private stopped: boolean = true;

  /**
   * Service constructor
   *
   * @param animationBuilder: AnimationBuilder
   * @param renderer: Renderer2
   */
  constructor(
    private animationBuilder: AnimationBuilder,
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  ngOnInit() { this.hide(); }

  /**
   * Init
   *
   * @param element: ElementRef
   */
  init(element: ElementRef) {
    this.el = element;
  }

  /**
   * Show
   */
  show() {
    if (!this.stopped || !this.el) {
      return;
    }

    const player = this.animationBuilder
      .build([style({ opacity: '0' }), animate(200, style({ opacity: '1' }))])
      .create(this.el.nativeElement);

    player.onStart(() => {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
      this.stopped = false;
    })

    setTimeout(() => player.play());
  }

  /**
   * Hide
   */
  hide() {
    if (this.stopped || !this.el) {
      return;
    }

    const player = this.animationBuilder
      .build([style({ opacity: '1' }), animate(200, style({ opacity: '0' }))])
      .create(this.el.nativeElement);

    player.onDone(() => {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      this.stopped = true;
    });

    setTimeout(() => player.play());
  }
}
