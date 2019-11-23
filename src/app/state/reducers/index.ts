import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { taskReducer } from './task.reducer';
import { authenticationReducer } from './authentication.reducer';

// export interface State {
//
// }

export const reducers: ActionReducerMap<any> = {
  task: taskReducer,
  auth: authenticationReducer
};


export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
