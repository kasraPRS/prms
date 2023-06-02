import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  defaultCommisionsChange$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor() { }
}
