export interface UTask_getAllUTasksFilter {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  dueDateStr?: any;
  DueDateNumber: number;
  assiegnedToId: number;
  assiegnedToFullname: string;
  type: number;
  typeStr: string;
  priority: number;
  reminderTime?: string;
  state: number;
  isActive: boolean;
  sms: boolean;
  email: boolean;
}

export interface UTask_getUTask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  assiegnedToId: number;
  type: number;
  priority: number;
  reminder?: string;
  ReminderTime?: string;
  state: number;
  isActive: boolean;
  sms: boolean;
  email: boolean;
}

export class UTaskModelFilter {
  assiegnedToId: string
  type: string
  priority: string
  state: string
  date: string
}