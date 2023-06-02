import { AbstractControl, ValidationErrors } from "@angular/forms";

export type ValidatorRs = { [k: string]: boolean } | null;
export interface ValidatorFn { (control: AbstractControl): ValidationErrors | null; }