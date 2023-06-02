import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { DocumentHttpService } from 'src/app/_requests/document/document.service';
import { Document_GetDocumentDTO } from 'src/app/_requests/document/documentModel';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';
import { backDomain } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UploadNewFileComponent } from '../_dialogs/upload-new-file/upload-new-file.component';

enum layouts {
  list,
  tile
}
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
})
export class DocumentsComponent implements OnInit {
  tooltip = ActivitiesTooltips.documents.file;
  layouts = layouts;
  layout: layouts = layouts.tile;
  // Search Input Status
  searchFocused: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  documentsList: Document_GetDocumentDTO[] = [];
  searchForDocument$: Subject<string> = new Subject<string>();
  constructor(
    private dialog: MatDialog,
    private documentHttpService: DocumentHttpService,
    private marketerUser: MarketerUser,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getDocuments();
    this.searchForDocuments();
  }
  onBtnAddDocumentClick() {
    this.dialog.open(UploadNewFileComponent, {}).afterClosed().subscribe(result => {
      if (result) {
        this.getDocuments();
      }
    });
  }

  onBtnChangeLayoutClick(style: layouts) {
    this.layout = style;
  }
  searchForDocuments() {
    this.searchForDocument$.pipe(
      debounceTime(500)
    ).subscribe(value => { this.getDocuments(value); })
  }
  getDocuments(fileName?: string) {
    this.documentHttpService.GetDocument({ fileName: fileName, userId: this.marketerUser.marketer.id.toString() }).subscribe(res => {
      this.documentsList = res.items;
      this.cdr.detectChanges();
    });
  }
  onChangeSearchInput(value: string) {
    this.searchForDocument$.next(value);
  }
  onDownloadAFile(url: string) {
    var link: HTMLAnchorElement = document.createElement("a");
    link.download = "Download.jpg";
    link.href = '//' + backDomain + url;
    document.body.appendChild(link);
    console.log(link);

    link.click();
    document.body.removeChild(link);
  }
  getFileIcon(fileName: string): string {
    if (fileName.includes('jpg')) return './assets/media/svg/files2/Group 1127.png'
    else if (fileName.includes('jpeg')) return './assets/media/svg/files2/Group 1128.png'
    else if (fileName.includes('png')) return './assets/media/svg/files2/Group 1129.png'
    else return './assets/media/svg/files/doc.svg'
  }
  onDeleteDoc(file: Document_GetDocumentDTO) {
    Swal.fire(
      {
        title: 'Are you sure you want to delete this item?',
        html: file.fileName,
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {
          this.documentHttpService.delete({ id: file.id }).subscribe(res => {
            const INDEX = this.documentsList.findIndex(i => i.id == file.id);            
            this.documentsList.splice(INDEX, 1);
            this.cdr.detectChanges();
          });
        }
      });
  }
  onEditBtnClick(file: Document_GetDocumentDTO) {
    this.dialog.open(UploadNewFileComponent, { data: { fileName: file.displayName, private: file.documentViewType == 0, id: file.id } }).afterClosed()
      .subscribe(result => {
        if (result) {
          this.getDocuments();
        }
      });
  }

}
