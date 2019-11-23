import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskType } from '../interfaces/task.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTask from '../state/reducers/task.reducer';
import * as actions from '../state/actions/task.action';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: Observable<TaskType[]>;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromTask.State>
  ) {
    this.form = formBuilder.group(validationConfig);
  }

  ngOnInit() {
    this.tasks = this.store.select(fromTask.selectAll);
  }

  taskClicked(t: any) {
    console.log('lol', t);

  }

  toggle(event: any, task: TaskType) {
    console.log('toggled', event.checked, task);
    if (event.checked) {
      this.store.dispatch(new actions.Update(task.id.toString(), { isDone: true }));
    } else {
      this.store.dispatch(new actions.Update(task.id.toString(), { isDone: false }));
    }
  }

  iconClicked(task: TaskType) {
    this.store.dispatch(new actions.Delete(task.id.toString()));
  }

  addTask() {
    const task: TaskType = {
      id: new Date().getUTCMilliseconds().toString(),
      name: this.form.value.taskName,
      isDone: false
    };

    this.store.dispatch(new actions.Create(task));

    this.form.reset();
  }
}

export const validationConfig = {
  taskName: ['', [
    Validators.required,
  ]
  ]
};
