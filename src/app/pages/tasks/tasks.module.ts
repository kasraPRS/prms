import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksCardsComponent } from './tasks-cards/tasks-cards.component';
import { TasksSettingComponent } from './tasks-setting/tasks-setting.component';
import { NewTaskComponent } from './new-task/new-task.component';

@NgModule({
  declarations: [
    TasksComponent,
    TasksCardsComponent,
    TasksSettingComponent,
    NewTaskComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TasksComponent],
})
export class TasksModule { }
