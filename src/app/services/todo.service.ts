import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TaskType } from '../interfaces/task.interface';

@Injectable()
export class TodoService {
  constructor() {
  }

  // TODO: Complete this service for storing Tasks in localstorage

  setAllTasks(tasks: TaskType[]) {
    return of(localStorage.setItem('tasks', JSON.stringify(tasks)));
  }

  getAllTasks() {
    return of(JSON.parse(localStorage.getItem('users')) || []);
  }

  createTask(task: TaskType) {
    const tasks = JSON.parse(localStorage.getItem('users')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  updateTask() {
    // TODO: NOT IMPLEMENTED
  }

}
