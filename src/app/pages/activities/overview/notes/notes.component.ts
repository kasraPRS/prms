import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { NoteHttpService } from 'src/app/_requests/note/note.service';
import { Note_getDTO } from 'src/app/_requests/note/noteModel';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import { User_getAllUsersIdAndNameDTO } from 'src/app/_requests/user/userModel';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'prms-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit {

  userProfileImgUrl: string;
  userName: string;
  userId: number;
  profileOwnerId: number;
  form: FormGroup = new FormGroup({
    private: new FormControl(false),
    description: new FormControl(null),
    file: new FormControl(null)
  });
  attachLink: string;
  submitSpnStatus: boolean;
  dataSource: PaginationModel<Note_getDTO[]> = new PaginationModel<Note_getDTO[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  filterModel: number[] = [];
  usersList: User_getAllUsersIdAndNameDTO[] = [];
  constructor(
    private noteHttpService: NoteHttpService,
    private userHttpService: UserHttpService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private marketerUser: MarketerUser,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProfileOwnerInfo();
    this.getUserDetail();
    this.getUsersListForFilter();
    this.getNotesList();
  }
  getProfileOwnerInfo() {
    this.profileOwnerId = this.marketerUser.marketer.id;
  }
  onBtnSaveNoteClick() {

    this.submitSpnStatus = true;
    this.form.disable();

    const NOTE = new FormData();
    NOTE.append('toId', this.profileOwnerId.toString());
    NOTE.append('private', this.form.get('private')!.value || false);
    NOTE.append('description', this.form.get('description')!.value);
    NOTE.append('attachLink', this.attachLink || '');
    NOTE.append('file', this.form.get('file')!.value || '');

    this.noteHttpService.post(NOTE).subscribe({
      next: () => {
        this.submitSpnStatus = false;
        this.form.enable();
        this.form.reset();
        this.attachLink = '';
        this.cdr.detectChanges();

        if (this.dataSource.items.length && this.dataSource.totalCount == this.dataSource.items.length) {
          if (this.dataSource.totalCount % this.dataSource.pageSize == 0) {
            this.dataSource.pageNumber++;
          }
          else {
            this.dataSource.items = this.dataSource.items.slice(0, this.dataSource.items.length - this.dataSource.items.length % this.dataSource.pageSize);
          }
          this.getNotesList();
        }
        else {
          this.getNotesList();
        }
      },
      error: err => {
        this.submitSpnStatus = false;
        this.cdr.detectChanges();
      }
    });

  }
  getNotesList() {

    this.noteHttpService.get({
      PageNumber: this.dataSource.pageNumber,
      PageSize: 10,
      UserId: this.profileOwnerId,
      fromUserId: this.filterModel.join(',')
    }).subscribe(res => {

      this.dataSource.hasNextPage = res.hasNextPage;
      this.dataSource.hasPreviousPage = res.hasPreviousPage;
      this.dataSource.items = res.items;
      this.dataSource.pageNumber = res.pageNumber;
      this.dataSource.pageSize = res.pageSize;
      this.dataSource.totalCount = res.totalCount;
      this.dataSource.totalPages = res.totalPages;
      this.cdr.detectChanges();

    });

  }
  getUsersListForFilter(searchText?: string) {
    this.usersList = [];
    this.userHttpService.getAllUsersIdAndName({ Name: searchText || '', IncludeAdmin: true }).subscribe(res => {
      this.usersList = res.items;
      this.cdr.detectChanges();
    });
  }
  onScrollDown() {
    if (this.dataSource.totalCount > this.dataSource.items.length) {
      this.dataSource.pageNumber++;
      this.getNotesList();
    }
  }
  onSlctFilterChange() {
    if (this.filterModel.filter(i => !i).length) {
      this.filterModel = [];
    }
    this.dataSource.items = [];
    this.dataSource.pageNumber = 1;
    this.getUsersListForFilter();
    this.getNotesList();
  }
  onSlctFilterSearch(event: any) {
    this.getUsersListForFilter(event?.term);
  }
  getUserDetail() {
    this.userId = this.authService.currentUserSubject.value?.id!;
    this.userName = this.authService.currentUserSubject.value?.fullName!;
    this.userProfileImgUrl = this.authService.currentUserSubject.value?.profileImageUrl!;
  }
  onUploadBtnClick() {
    document.getElementById('noteFileUploader')?.click();
  }
  onFileUploadeChange(event: FileList) {
    this.form.get('file')?.setValue(event.item(0)!);
  }
  onBtnDeleteNoteClick(note: Note_getDTO) {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.deleteNote(note);
      }
    });
  }
  deleteNote(note: Note_getDTO) {
    this.noteHttpService.delete({ id: note.id }).subscribe(res => {

      const INDEX = this.dataSource.items.findIndex(i => i.id == note.id);
      this.dataSource.items.splice(INDEX, 1);
      this.cdr.detectChanges();

    });
  }

}
