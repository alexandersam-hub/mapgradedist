import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITask} from "../../../../domains/task/task.interface";

@Component({
  selector: 'app-task-card-config',
  templateUrl: './task-card-config.component.html',
  styleUrls: ['./task-card-config.component.css']
})
export class TaskCardConfigComponent {

  @Input() task: ITask | undefined
  @Input() filters: string[] = []
  @Output() deleteTaskEmitter = new EventEmitter<ITask>()
  @Output() saveTaskEmitter = new EventEmitter<ITask>()
  @Output() copyTaskEmitter = new EventEmitter<ITask>()

  isChanged: boolean = false

  saveTask(){
    if (this.task) {
      this.saveTaskEmitter.emit(this.task)
    }
    this.isChanged = false
  }

  deleteTask() {
    if (this.task) {
      this.deleteTaskEmitter.emit(this.task)
    }
  }

  changeField(){
    this.isChanged = true
  }

  copyTask() {
    if(this.task)
      this.copyTaskEmitter.emit(this.task)
  }
}
