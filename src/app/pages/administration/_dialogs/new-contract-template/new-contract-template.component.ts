import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as CkEditor from 'src/app/_modules/ckEditor';
import { ContractTemplateHttpService } from 'src/app/_requests/contractTemplate/contractTemplate.service';

@Component({
  selector: 'prms-new-contract-template',
  templateUrl: './new-contract-template.component.html',
})
export class NewContractTemplateComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  editor = CkEditor;
  private unsubscribe: Subscription[] = [];
  submitForm: FormGroup;
  id: number = 0
  title: string = ''

  constructor(
    private dialogRef: MatDialogRef<NewContractTemplateComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private ContractTemplateHttpService: ContractTemplateHttpService
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.initForm()
    if (data) {
      this.id = data.id;
      this.formValues.name.setValue(data.name)
      this.formValues.content.setValue(data.content)
    }
  }

  ngOnInit(): void {
  }

  get formValues() {
    return this.submitForm.controls;
  }

  initForm() {
    this.submitForm = this.fb.group({
      name: [null, Validators.compose([Validators.required]),],
      content: [null, Validators.compose([Validators.required,]),]
    });
  }

  onSubmit() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.dialogRef.close();
    }, 1500);

    if (this.id <= 0) {
      const data = {
        name: this.formValues.name.value,
        content: this.formValues.content.value,
      }
      this.ContractTemplateHttpService.post(data).subscribe(result => {
        // do nothing  
      })
    } else {
      const data = {
        id: this.id,
        name: this.formValues.name.value,
        content: this.formValues.content.value,
      }
      this.ContractTemplateHttpService.put(data).subscribe(result => {
        // do nothing    
      })
    }
  }

  close() { this.dialogRef.close(); }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
