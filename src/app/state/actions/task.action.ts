import { Action } from '@ngrx/store';
import { TaskType } from '../../interfaces/task.interface';

export const CREATE = '[Task] Create';
export const UPDATE = '[Task] Update';
export const DELETE = '[Task] Delete';

export class Create implements Action {
  readonly type = CREATE;

  constructor(public task: TaskType) {
  }
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(
    public id: string,
    public changes: Partial<TaskType>,
  ) {
  }
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public id: string) {
  }
}

export type TaskActions
  = Create
  | Update
  | Delete;
