import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as CkEditor from 'src/app/_modules/ckEditor';
import { UserHttpService } from '../../../../_requests/user/user.service'
import { ContractTemplate_getListAllDTO } from 'src/app/_requests/contractTemplate/contractTemplateModel';
import { ContractTemplateHttpService } from 'src/app/_requests/contractTemplate/contractTemplate.service';
import { ContractHttpService } from 'src/app/_requests/contract/contract.service';
import { User_getAllListDTO } from 'src/app/_requests/user/userModel';

@Component({
  selector: 'prms-new-contract',
  templateUrl: './new-contract.component.html',
})
export class NewContractComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];
  ContractTemplateDto: ContractTemplate_getListAllDTO[] = []
  UserModelDto: User_getAllListDTO[] = []
  submitForm: FormGroup;
  id: number = 0
  title: string = ''
  periodId: string = ''
  currentUser: string = ''
  editor = CkEditor;

  constructor(
    private dialogRef: MatDialogRef<NewContractComponent>,
    private cdr: ChangeDetectorRef,
    private ContractTemplateHttpService: ContractTemplateHttpService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private ContractHttpService: ContractHttpService,
    private UserHttpService: UserHttpService
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.initForm()
    if (data) {
      this.title = data.title
      this.id = data.id;
      this.currentUser = data.currentUser
      this.periodId = data.periodId
      this.formValues.period.setValue(data.period)
      this.formValues.name.setValue(data.name)
      this.formValues.userId.setValue(data.userId)
      this.formValues.content.setValue(data.content)
      this.formValues.contractTemplateId.setValue(data.contractTemplateId)
    }
  }

  ngOnInit(): void {
    this.onGetListContractTemplateAll()
    this.onGetListUserAll()
  }

  initForm() {
    this.submitForm = this.fb.group({
      contractTemplateId: ['0', Validators.compose([Validators.required,]),],
      period: [null, Validators.compose([Validators.required,]),],
      name: [null, Validators.compose([Validators.required,]),],
      userId: [null, Validators.compose([Validators.required,]),],
      content: [null, Validators.compose([Validators.required,]),],
    });
  }

  get formValues() {
    return this.submitForm.controls;
  }

  createNewContract() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.dialogRef.close();
    }, 1500);

    if (this.id <= 0) {
      const data = {
        name: this.formValues.name.value,
        contractTemplateId: this.formValues.contractTemplateId.value,
        period: this.formValues.period.value,
        userId: this.formValues.userId.value,
        periodId: this.periodId,
        content: this.formValues.content.value,
      }
      this.ContractHttpService.post(data).subscribe(result => {
        // do nothing  
      })
    } else {
      const data = {
        id: this.id,
        name: this.formValues.name.value,
        contractTemplateId: this.formValues.contractTemplateId.value,
        period: this.formValues.period.value,
        userId: this.formValues.userId.value,
        periodId: this.periodId,
        content: this.formValues.content.value,
      }
      this.ContractHttpService.update(data).subscribe(result => {
        // do nothing  
      })
    }
  }

  close() { this.dialogRef.close(); }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  onGetListContractTemplateAll() {
    this.ContractTemplateHttpService.getListAll({ Name: "" }).subscribe(res => {
      this.ContractTemplateDto = res;
      this.cdr.detectChanges();
    });
  }

  onGetListUserAll() {
    this.UserHttpService.getAllList().subscribe(res => {
      this.UserModelDto = res;
      this.cdr.detectChanges();
    });
  }

  onChangePeriod(_data: any) {
    const selectedMonth = _data.target.value
    switch (selectedMonth) {
      case "1":
        this.formValues.period.setValue(1)
        break;
      case "2":
        this.formValues.period.setValue(2)
        break;
      case "3":
        this.formValues.period.setValue(3)
        break;
      case "4":
        this.formValues.period.setValue('')
        break;
    }
  }

}
