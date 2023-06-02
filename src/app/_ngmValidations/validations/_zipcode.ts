import { Directive } from "@angular/core";
import { ValidatorRs } from "../models/validator";
import { AbstractControl, NG_VALIDATORS } from "@angular/forms";
import * as ZipCode from 'zipcodes';

function zipCode(control: AbstractControl): ValidatorRs {
    if (!control.value) return null;
    if (!ZipCode.lookup(control.value)) return { zipCode: true }
    return null;
}
@Directive({
    selector: '[ngmZipCode][ngModel]',
    providers: [{ useValue: zipCode, provide: NG_VALIDATORS, multi: true, }]
})
export class NgmZipCodeDirective { }
export { zipCode as NgmZipCodeFn };
