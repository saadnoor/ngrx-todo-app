import * as actions from '../actions/task.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { TaskType } from '../../interfaces/task.interface';



// Entity adapter
export const taskAdapter = createEntityAdapter<TaskType>();

export interface State extends EntityState<TaskType> {
}
// Default data / initial state

const defaultTask = {
};

export const initialTaskState: State = taskAdapter.getInitialState(defaultTask);

// Reducer

export function taskReducer(
  state: State = initialTaskState,
  action: actions.TaskActions) {

  switch (action.type) {

    case actions.CREATE:
      return taskAdapter.addOne(action.task, state);

    case actions.UPDATE:
      return taskAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);

    case actions.DELETE:
      return taskAdapter.removeOne(action.id, state);

    default:
      return state;
  }

}

// Create the default selectors
export const getTaskState = createFeatureSelector<State>('task');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = taskAdapter.getSelectors(getTaskState);
