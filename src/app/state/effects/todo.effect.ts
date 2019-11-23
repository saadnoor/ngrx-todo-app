 import { Injectable } from '@angular/core';
 import { Actions } from '@ngrx/effects';
 import { TodoService } from '../../services/todo.service';
//
// import { Actions} from '@ngrx/effects';
// import { TodoService } from '../../services/todo.service';
//
//

@Injectable()
export class TodoEffects {
// TODO: Complete this effects for storing data in localStorage
  constructor(
    private actions: Actions,
    private todoService: TodoService,
  ) {}
}
