import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent
} from "../../kt/components";

export class PluginsInit {
  private static toggle: number = 1;
  private static initComponents(ms: number = 200) {
    setTimeout(() => {
      ToggleComponent.bootstrap();
      ScrollTopComponent.bootstrap();
      DrawerComponent.bootstrap();
      StickyComponent.bootstrap();
      MenuComponent.bootstrap();
      ScrollComponent.bootstrap();
    }, ms);
  }
  public static init() {
    switch (this.toggle) {
      case 1:
        this.toggle = 2;
        this.initComponents();
        break;
      case 2:
        this.initComponents();
        this.initComponents(600);
        break;
    }
  }
}