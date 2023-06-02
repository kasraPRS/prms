import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DocumentHttpService } from 'src/app/_requests/document/document.service';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import { ToastrService } from 'src/app/_services/toastr.service';

@Component({
  selector: 'prms-upload-new-file',
  templateUrl: './upload-new-file.component.html',
})
export class UploadNewFileComponent implements OnInit {

  id: number;
  fileName: string;
  file: File;
  private: boolean;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<UploadNewFileComponent>,
    private documentHttpService: DocumentHttpService,
    private cdr: ChangeDetectorRef,
    private marketerUser: MarketerUser,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data.id;
      this.fileName = data.fileName;
      this.private = data.private;
    }
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void { }
  close() { this.dialogRef.close(); }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onUploadBtnClick() {
    document.getElementById('fileUploader')?.click();
  }
  onFileUploadeChange(event: FileList) {
    this.file = event.item(0)!;
  }
  onDoneBtnClick() {

    this.isLoading$.next(true);

    if (this.id) this.editDocument();
    else this.addNewDocument();

  }
  addNewDocument() {
    const BODY = new FormData();
    BODY.append('userId', this.marketerUser.marketer.id.toString());
    BODY.append('displayName', this.fileName);
    BODY.append('fileUpload', this.file);
    BODY.append('documentViewType', (this.private ? '0' : '1'));

    this.documentHttpService.post(BODY).subscribe({
      next: res => { this.dialogRef.close(res) },
      error: err => {
        this.toastr.error(err);
        this.isLoading$.next(false);
      }
    });
  }
  editDocument() {
    const BODY = new FormData();
    BODY.append('id', this.id.toString());
    BODY.append('displayName', this.fileName);
    BODY.append('fileUpload', this.file);
    BODY.append('documentViewType', (this.private ? '0' : '1'));

    this.documentHttpService.put(BODY).subscribe({
      next: res => { this.dialogRef.close(res) },
      error: err => {
        this.toastr.error(err);
        this.isLoading$.next(false);
      }
    });
  }
}
