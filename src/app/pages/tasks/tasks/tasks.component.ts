import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UTaskModelFilter } from 'src/app/_requests/utask/utaskModel';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TasksCardsComponent } from '../tasks-cards/tasks-cards.component';

@Component({
  selector: 'prms-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  @ViewChild('newTaskFormRef') newTaskCompo: NewTaskComponent;
  @ViewChild('taskCard', { static: true }) tasksRef: TasksCardsComponent;
  taskSetting = false;
  newTask = false;
  uTaskModelFilter: UTaskModelFilter = new UTaskModelFilter()

  constructor() { }

  ngOnInit(): void { }

  openMatExpansion() {
    this.newTask = true
  }

  closeMatExpansion() {
    this.newTask = false
  }

  onCheckInvalidForm(): boolean {
    return this.newTaskCompo?.submitForm?.invalid || false
  }

  getDataTaskSetting(data: any) {
    switch (data.target.name) {
      case "date": this.uTaskModelFilter.date = data.target.value; break;
      case "assiegnedToId": this.uTaskModelFilter.assiegnedToId = data.target.value; break;
      case "type": this.uTaskModelFilter.type = data.target.value; break;
      case "priority": this.uTaskModelFilter.priority = data.target.value; break;
      case "state": this.uTaskModelFilter.state = data.target.value; break;
    }
    this.tasksRef.onGetAllUTasksFilter(this.uTaskModelFilter);
  }

  getDataNewTask(data: any) {
    this.tasksRef.onGetAllUTasksFilter(this.uTaskModelFilter);
  }

  getDataUpdateClick(data: any) {
    this.newTaskCompo.onSubmitUpdate(data)
  }

  onBtnDismissClick(event: Event) {
    event.stopPropagation();
    this.newTaskCompo.clearDateForm()
  }

  onBtnSubmitClick(event: Event) {
    event.stopPropagation();
    if (this.newTask) {
      this.newTaskCompo.onSubmitForm();
    } else {
      this.openMatExpansion()
    }
  }
}
