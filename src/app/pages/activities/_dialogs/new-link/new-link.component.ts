import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CampaignHttpService } from '../../../../_requests/linkCampaign/linkCampaign.service';
import { LinkHttpService } from '../../../../_requests/link/link.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUser } from 'src/app/_services/current-user.service';
import { LinkCampaign_getListAllDTO } from 'src/app/_requests/linkCampaign/linkCampaignModel';
import { Link_GetMediumListDto, Link_GetSourceListDto } from 'src/app/_requests/link/linkModel';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-new-link',
  templateUrl: './new-link.component.html',
})
export class NewLinkComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];
  campaigns: LinkCampaign_getListAllDTO[] = [];
  id: number = 0
  title: string = ''  
  submitForm: FormGroup;
  urlId: string = '0'
  management: boolean = false
  sourceDto: Link_GetSourceListDto[] = []
  mediumDto: Link_GetMediumListDto[] = []
  source: string = '';
  medium: string = '';
  tooltips = ActivitiesTooltips;

  constructor(
    private dialogRef: MatDialogRef<NewLinkComponent>,
    private dialog: MatDialog,
    private CampaignHttpService: CampaignHttpService,
    private LinkHttpService: LinkHttpService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
  ) {
    this.isLoading = false
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.initForm();
    if (data) {

      switch (data.url) {
        case `https://helpahand1234demo.com/account/register`:
          this.urlId = '1'
          break;
        case `https://helpahand1234demo.com/Account/RegisterNpc`:
          this.urlId = '2'
          break;
        case `https://helpahand1234demo.com/account/login`:
          this.urlId = '3'
          break;
        default:
          this.urlId = '0'
          break;
      }

      this.id = data.id;
      this.title = data.title;
      this.formValues.url.setValue(data.url);
      this.formValues.name.setValue(data.name);
      this.formValues.campaignId.setValue(data.linkCampaignId);
      this.formValues.source.setValue(data.source);
      this.formValues.medium.setValue(data.medium);
      this.source = data.source;
      this.medium = data.medium;
      this.management = data.management;
    }
  }

  ngOnInit(): void {
    if (this.management) {
      this.getAllListSubMarketers();
    } else {
      this.onGetListAll();
    }
    this.onGetSourceList();
    this.onGetMediumList();
  }

  initForm() {
    // const regexpatternGlobal = ("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"); 
    const regexPattern = '((http|https)://)(www.)?helpahand1234demo\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
    this.submitForm = this.fb.group({
      url: [null, Validators.compose([Validators.required, Validators.pattern(regexPattern)]),],
      name: [null, Validators.compose([Validators.required,]),],
      campaignId: [0],
      medium: [''],
      source: [''],
    });
  }

  onChangeUrl(_data: any) {
    const selectedMonth = _data.target.value
    switch (selectedMonth) {
      case "1":
        this.urlId = '1'
        this.formValues.url.setValue(`https://helpahand1234demo.com/account/register`)
        break;
      case "2":
        this.urlId = '2'
        this.formValues.url.setValue(`https://helpahand1234demo.com/Account/RegisterNpc`)
        break;
      case "3":
        this.urlId = '3'
        this.formValues.url.setValue(`https://helpahand1234demo.com/account/login`)
        break;
      case "0":
        this.formValues.url.setValue(``)
        this.urlId = '0'
        break;
    }
  }

  get formValues() {
    return this.submitForm.controls;
  }

  createNewLink() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.dialogRef.close();
    }, 1500);

    if (this.id <= 0) {
      this.LinkHttpService.post({
        name: this.formValues.name.value,
        userId: CurrentUser.userId,
        linkCampaignId: this.formValues.campaignId.value,
        url: this.formValues.url.value,
        source: this.source,
        medium: this.medium
      }).subscribe(result => {
        // do nothing  
      })
    } else {
      this.LinkHttpService.put({
        id: this.id,
        name: this.formValues.name.value,
        userId: CurrentUser.userId,
        linkCampaignId: this.formValues.campaignId.value,
        url: this.formValues.url.value,
        source: this.source,
        medium: this.medium
      }).subscribe(result => {
        // do nothing    
      })
    }
  }

  close() { this.dialogRef.close(); }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  onGetListAll() {
    this.CampaignHttpService.getListAll({ UserId: CurrentUser.userId }).subscribe(res => {
      this.campaigns = res;
      this.cdr.detectChanges();
    });
  }

  getAllListSubMarketers() {
    this.CampaignHttpService.getAllListSubMarketers({ Name: '', UserId: CurrentUser.userId }).subscribe(res => {
      this.campaigns = res;
      this.cdr.detectChanges();
    });
  }

  onChangeSource(_data: any) {
    this.source = _data.value
  }

  onChangeMedium(_data: any) {
    this.medium = _data.value
  }

  private onGetSourceList() {
    this.LinkHttpService.getSourceList({ Source: "", UserId: CurrentUser.userId })
      .subscribe(res => {
        this.sourceDto = [];
        this.sourceDto = res;
        this.cdr.detectChanges();
      });
  }

  private onGetMediumList() {
    this.LinkHttpService.getMediumList({ Medium: "", UserId: CurrentUser.userId })
      .subscribe(res => {
        this.mediumDto = [];
        this.mediumDto = res;
        this.cdr.detectChanges();
      });
  }

}
