import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UTaskModelFilter } from 'src/app/_requests/utask/utaskModel';
import { UTaskHttpService } from '../../../_requests/utask/utask.service'
import { UserHttpService } from '../../../_requests/user/user.service'
import { User_getAllListDTO } from 'src/app/_requests/user/userModel';
// import { UserModelDto } from 'src/app/_models/Users/userModelDto';
// import { UTaskModelFilter } from 'src/app/_models/UTask/utaskModelFilter';

@Component({
  selector: 'prms-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  id: number = 0
  submitForm: FormGroup;
  assiegnedToDto: User_getAllListDTO[] = []
  uTaskModelFilter: UTaskModelFilter = new UTaskModelFilter();
  @Output() changeEmitterNewTask: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private UTaskHttpService: UTaskHttpService,
    private UserHttpService: UserHttpService,
    private cdr: ChangeDetectorRef,
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    this.onGetListAssiegnedTo()
  }

  initForm() {
    this.submitForm = this.fb.group({
      title: [null, Validators.compose([Validators.required,]),],
      description: [null, Validators.compose([Validators.required,]),],
      reminderTime: [null],
      dueDate: [null, Validators.compose([Validators.required,]),],
      assiegnedToId: [null, Validators.compose([Validators.required,]),],
      type: [null, Validators.compose([Validators.required,]),],
      priority: [null, Validators.compose([Validators.required,]),],
      reminder: [false, Validators.compose([Validators.required,]),],
      isActive: [false, Validators.compose([Validators.required,]),],
      sms: [false, Validators.compose([Validators.required,]),],
      email: [false, Validators.compose([Validators.required,]),],
    });
  }

  get formValues() {
    return this.submitForm.controls;
  }

  onSubmitForm() {
    if (this.id <= 0) {
      const data = {
        _title: this.formValues.title.value,
        _description: this.formValues.description.value,
        _dueDate: this.formValues.dueDate.value,
        _reminderTime: this.formValues.reminderTime.value,
        _assiegnedToId: this.formValues.assiegnedToId.value,
        _type: this.formValues.type.value,
        _priority: this.formValues.priority.value,
        _reminder: this.formValues.reminder.value,
        _isActive: this.formValues.isActive.value,
        _sms: this.formValues.sms.value,
        _email: this.formValues.email.value,
      }
      this.UTaskHttpService.create(data).subscribe(result => {
        this.clearDateForm()
        this.changeEmitterNewTask.emit("onsubmit");
      })
    }
    else {
      const data = {
        _id: this.id,
        _title: this.formValues.title.value,
        _description: this.formValues.description.value,
        _dueDate: this.formValues.dueDate.value,
        _reminderTime: this.formValues.reminderTime.value,
        _assiegnedToId: this.formValues.assiegnedToId.value,
        _type: this.formValues.type.value,
        _priority: this.formValues.priority.value,
        _reminder: this.formValues.reminder.value,
        _isActive: this.formValues.isActive.value,
        _sms: this.formValues.sms.value,
        _email: this.formValues.email.value,
      }
      this.UTaskHttpService.update(data).subscribe(result => {
        this.clearDateForm()
        this.changeEmitterNewTask.emit("onsubmit");
      })
    }
  }

  onSubmitUpdate(data: any) {
    if (data) {
      this.id = data.id
      this.formValues.title.setValue(data.title)
      this.formValues.description.setValue(data.description)
      this.formValues.dueDate.setValue(data.dueDate.split('T')[0])
      this.formValues.reminderTime.setValue(data.reminderTime)
      this.formValues.assiegnedToId.setValue(data.assiegnedToId)
      this.formValues.type.setValue(data.type)
      this.formValues.priority.setValue(data.priority)
      this.formValues.reminder.setValue(data.reminder)
      this.formValues.isActive.setValue(data.isActive)
      this.formValues.sms.setValue(data.sms)
      this.formValues.email.setValue(data.email)
    }
  }

  clearDateForm() {
    this.id = 0
    this.formValues.title.setValue(null)
    this.formValues.description.setValue(null)
    this.formValues.dueDate.setValue(null)
    this.formValues.reminderTime.setValue(null)
    this.formValues.assiegnedToId.setValue(null)
    this.formValues.type.setValue(null)
    this.formValues.priority.setValue(null)
    this.formValues.reminder.setValue(false)
    this.formValues.isActive.setValue(false)
    this.formValues.sms.setValue(false)
    this.formValues.email.setValue(false)
  }

  onGetListAssiegnedTo() {
    this.UserHttpService.getAllList().subscribe(res => {
      this.assiegnedToDto = res
      this.cdr.detectChanges()
    })
  }

}
