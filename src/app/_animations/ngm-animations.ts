import { Injectable } from "@angular/core";

// #region Animations
import { AnimationSlide } from "./_slide-toggle";
// #endregion Animations

@Injectable()
export class NgmAnimations {
  static Slide = AnimationSlide;
}