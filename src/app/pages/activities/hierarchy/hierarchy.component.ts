import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'src/app/_services/toastr.service';
import { AddToCategoryDialogComponent } from '../../_dialogs/add-to-category/add-to-category.component';
import { AuthService } from 'src/app/modules/auth';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
@Component({
  selector: 'prms-hierarchy',
  templateUrl: './hierarchy.component.html',
})
export class HierarchyComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private toastr: ToastrService,
    public authService: AuthService,
    public marketerUser: MarketerUser,
  ) { }
  ngOnInit(): void { }
  addToCategory() {
    let dialogRef = this.dialog.open(AddToCategoryDialogComponent, {
      data: { userId: this.marketerUser.marketerId },
    }).afterClosed().subscribe(() => {
      dialogRef.unsubscribe();
    });
  }

  onCopyProfileLink() {
    this.clipboard.copy(`${environment.profileLink}?i=${this.marketerUser.marketerId}`);
    this.toastr.success('Profile Link Copied to Clipboard.');
  }
}
