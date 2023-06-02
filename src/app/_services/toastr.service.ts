import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService as tstr } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    private toastr: tstr
  ) { }
  success(message: string, title: string = '', optionsOverride: Partial<IndividualConfig> | undefined = {}) {
    this.toastr.success(message, title, optionsOverride);
  }
  info(message: string, title: string = '', optionsOverride: Partial<IndividualConfig> | undefined = {}) {
    this.toastr.info(message, title, optionsOverride);
  }
  warning(message: string, title: string = '', optionsOverride: Partial<IndividualConfig> | undefined = {}) {
    this.toastr.warning(message, title, optionsOverride);
  }
  error(message: string, title: string = '', optionsOverride: Partial<IndividualConfig> | undefined = {}) {
    this.toastr.error(message, title, optionsOverride);
  }
  clear() {
    this.toastr.clear();
  }

}
