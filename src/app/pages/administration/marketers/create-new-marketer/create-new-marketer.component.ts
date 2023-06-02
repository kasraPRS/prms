import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'prms-create-new-marketer',
  templateUrl: './create-new-marketer.component.html',
})
export class CreateNewMarketerComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router:Router
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void { }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.router.navigateByUrl('/administration/marketers')
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
