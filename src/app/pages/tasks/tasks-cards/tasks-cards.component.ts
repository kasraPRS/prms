import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UTaskModelFilter, UTask_getAllUTasksFilter } from 'src/app/_requests/utask/utaskModel';
import { UTaskHttpService } from '../../../_requests/utask/utask.service'

@Component({
  selector: 'prms-tasks-cards',
  templateUrl: './tasks-cards.component.html',
  styleUrls: ['./tasks-cards.component.scss']
})
export class TasksCardsComponent implements OnInit {

  UTaskDto: UTask_getAllUTasksFilter[] = []
  uTaskModelFilter: UTaskModelFilter = new UTaskModelFilter();
  @Output() changeEmitterTaskCard: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private UTaskHttpService: UTaskHttpService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.onGetAllUTasksFilter(this.uTaskModelFilter)
  }

  onGetAllUTasksFilter(uTaskModelFilter: UTaskModelFilter) {
    this.UTaskHttpService.getAllUTasksFilter(uTaskModelFilter).subscribe(res => {
      this.UTaskDto = res;
      this.cdr.detectChanges();
    })
  }

  onBtnEditClick(_item: any) {
    this.UTaskHttpService.getUTask(_item.id).subscribe(res => {
      this.changeEmitterTaskCard.emit(res);
    })
  }

}
