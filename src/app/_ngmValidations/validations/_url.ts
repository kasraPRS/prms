import { Directive } from "@angular/core";
import { ValidatorRs } from "../models/validator";
import { AbstractControl, NG_VALIDATORS } from "@angular/forms";

function url(control: AbstractControl): ValidatorRs {
    let regexp = /^(https|http):\/\/(www\.)?([a-z])(([0-9]|[a-z])+)(\.[a-z]{2,6})(\/.*$)?/gi;
    if (!control.value) return null;
    if (!regexp.test(control.value)) return { url: true }
    return null;
}
@Directive({
    selector: '[ngmUrl][ngModel]',
    providers: [{ useValue: url, provide: NG_VALIDATORS, multi: true, }]
})
export class NgmUrlDirective { }
export { url as NgmUrlFn };
