import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { User_getAllListDTO } from 'src/app/_requests/user/userModel';
import { UTaskModelFilter } from 'src/app/_requests/utask/utaskModel';
import { UserHttpService } from '../../../_requests/user/user.service'

@Component({
  selector: 'prms-tasks-setting',
  templateUrl: './tasks-setting.component.html',
  styleUrls: ['./tasks-setting.component.scss']
})
export class TasksSettingComponent implements OnInit {

  assiegnedToDto: User_getAllListDTO[] = [];
  changeEmitterTaskSetting: EventEmitter<any> = new EventEmitter<any>();

  assiegnedToId: string = ''
  type: string = ''
  priority: string = ''
  state: string = ''
  date: string = ''

  UTaskModelFilter: UTaskModelFilter = new UTaskModelFilter()

  constructor(
    private UserHttpService: UserHttpService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.onGetListUserAssiegnedTo()
  }

  onGetListUserAssiegnedTo() {
    this.UserHttpService.getAllList().subscribe(res => {
      this.assiegnedToDto = res
      this.cdr.detectChanges()
    })
  }

  onChangeDate(_data: any) {
    this.date = _data.target.value
    this.UTaskModelFilter.date = this.date
    this.changeEmitterTaskSetting.emit(this.UTaskModelFilter);
  }

  onChangeAssienedTo(_data: any) {
    this.assiegnedToId = _data.target.value
    this.UTaskModelFilter.assiegnedToId = this.assiegnedToId
    this.changeEmitterTaskSetting.emit(this.UTaskModelFilter);
  }

  onChangeType(_data: any) {
    this.type = _data.target.value
    this.UTaskModelFilter.type = this.type
    this.changeEmitterTaskSetting.emit(this.UTaskModelFilter);
  }

  onChangePriority(_data: any) {
    this.priority = _data.target.value
    this.UTaskModelFilter.priority = this.priority
    this.changeEmitterTaskSetting.emit(this.UTaskModelFilter);
  }

  onChangeState(_data: any) {
    this.state = _data.target.value
    this.UTaskModelFilter.state = this.state
    this.changeEmitterTaskSetting.emit(this.UTaskModelFilter);
  }

}
