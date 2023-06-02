import { Directive } from "@angular/core";
import { ValidatorRs } from "../models/validator";
import { AbstractControl, NG_VALIDATORS } from "@angular/forms";

function email(control: AbstractControl): ValidatorRs {
    let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/gi;
    if (!control.value) return null;
    if (!regexp.test(control.value)) return { email: true }
    return null;
}
@Directive({
    selector: '[ngmEmail][ngModel]',
    providers: [{ useValue: email, provide: NG_VALIDATORS, multi: true, }]
})
export class NgmEmailDirective { }
export { email as NgmEmailFn };

