import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/_services/current-user.service';
import { CampaignHttpService } from '../../../../_requests/linkCampaign/linkCampaign.service';
import { LinkHttpService } from '../../../../_requests/link/link.service';
import { Link_getAllListSubMarketersDTO } from 'src/app/_requests/link/linkModel';

@Component({
  selector: 'prms-new-campaign',
  templateUrl: './new-campaign.component.html',
})
export class NewCampaignComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];
  // currentUser: CurrentUser
  title: string = ''
  id: number = 0
  linkDto: Link_getAllListSubMarketersDTO[] = [];
  submitForm: FormGroup;
  management: boolean = false

  constructor(
    private dialogRef: MatDialogRef<NewCampaignComponent>,
    private cdr: ChangeDetectorRef,
    private CampaignHttpService: CampaignHttpService,
    private LinkHttpService: LinkHttpService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.initForm()
    if (data) {
      this.title = data.title
      this.id = data.id;
      this.management = data.management
      this.formValues.name.setValue(data.name)
      this.formValues.linkId.setValue(data.linkId)
    }
  }

  ngOnInit(): void {
    if (this.management) {
      this.getAllListSubMarketers()
    } else {
      this.getListLink()
    }
  }

  initForm() {
    this.submitForm = this.fb.group({
      name: [null, Validators.compose([Validators.required,]),],
      linkId: [[],],
    });
  }

  get formValues() {
    return this.submitForm.controls;
  }

  createNewCampaign() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.dialogRef.close();
    }, 1500);

    if (this.id <= 0) {
      const data = {
        name: this.formValues.name.value,
        userId: CurrentUser.userId,
        linkId: this.formValues.linkId.value
      }
      this.CampaignHttpService.post(data).subscribe(result => {
        // do nothing
      })
    } else {
      const data = {
        id: this.id,
        name: this.formValues.name.value,
        userId: CurrentUser.userId,
        linkId: this.formValues.linkId.value
      }
      this.CampaignHttpService.put(data).subscribe(result => {
        // do nothing    
      })
    }

  }

  private getListLink() {
    this.LinkHttpService.getAllList({ UserId: CurrentUser.userId }).subscribe(res => {
      this.linkDto = res
    })
  }

  private getAllListSubMarketers() {
    this.LinkHttpService.getAllListSubMarketers({ Name: '', UserId: CurrentUser.userId }).subscribe(res => {
      this.linkDto = res
    })
  }

  close() { this.dialogRef.close(); }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
