import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CurrentUser } from './_services/current-user.service';
import { TranslationService } from './modules/i18n';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as jpLang } from './modules/i18n/vocabs/jp';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as frLang } from './modules/i18n/vocabs/fr';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private ngSelectConfig: NgSelectConfig,
    private currentUser: CurrentUser,
    private cdr: ChangeDetectorRef,
    tooltipConfig: NgbTooltipConfig,
  ) {
    // register translations
    this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);
    // Set Default Config NgSelect
    this.ngSelectConfig.clearSearchOnAdd = false;
    // For Save Viewed User 
    this.currentUser.init();
    this.subscribeCurrentUser();
    // Set Tooltip Config
    tooltipConfig.placement = 'right-top';
    // tooltipConfig.triggers = 'click';
    tooltipConfig.container = 'body';
    tooltipConfig.tooltipClass = 'custom-tooltip tooltip-lg';
  }
  ngOnInit() { }
  subscribeCurrentUser() {
    CurrentUser.change$.subscribe(() => {
      setTimeout(() => { this.cdr.detectChanges(); }, 500);
    });
  }
}
