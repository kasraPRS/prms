import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';

enum visibleAreatas {
  information,
  banner
}
@Component({
  selector: 'prms-link-information',
  templateUrl: './link-information.component.html',
})
export class LinkInformationComponent implements OnInit {

  visibleAreatas = visibleAreatas;
  visibleArea: visibleAreatas = visibleAreatas.information;
  banner: any = null;

  constructor(
    private dialogRef: MatDialogRef<LinkInformationComponent>,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void { }
  close() {
    this.dialogRef.close();
  }

  addBannerBtnClick() {
    console.log("did");

    this.visibleArea = visibleAreatas.banner;
    this.cdr.detectChanges();
  }
  onBannerDialogBtnBackClick(data: any) {
    this.visibleArea = visibleAreatas.information;
    if (data) {
      //this means that btn next clicked, you shoud pass generated banner here when next button clicked.
      this.banner = data;
      this.cdr.detectChanges();
    }
    else {
      //this means that btn back clicked, pass nothing if back button clicked.
    }
  }

}
