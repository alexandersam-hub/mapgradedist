import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITask} from "../../../../domains/task/task.interface";
import {TaskDefault} from "./task-default";
import {config} from "../../../../../config";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskConfigService {
  private tasks: ITask[] | undefined

  constructor(private http: HttpClient) { }

  get Tasks () {
    return this.tasks
  }

  set Tasks (tasks) {
    this.tasks = tasks
  }

  createTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(config.urlTask, task)
  }
  updateTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(config.urlTask, task)
  }
  deleteTask(taskId: string):Observable<ITask>{
    return this.http.delete<ITask>(config.urlTask + taskId)
  }

  getAllTasks(): Observable<ITask[]>{
    return this.http.get<ITask[]>(config.urlTask)
  }

  getEmptyTask():ITask {
    return new TaskDefault()
  }

}
