import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "../../../config";
import {ITask} from "../../domains/task/task.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public getTasks(){
    return this.http.get<ITask[]>(config.urlTask)
  }
}
