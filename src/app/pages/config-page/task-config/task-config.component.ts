import {Component, OnInit} from '@angular/core';
import {ITask} from "../../../domains/task/task.interface";
import {TaskConfigService} from "../services/task/task-config.service";
import {IUser} from "../../../domains/user/users.interface";

@Component({
  selector: 'app-task-config',
  templateUrl: './task-config.component.html',
  styleUrls: ['./task-config.component.css']
})
export class TaskConfigComponent implements OnInit {
  isLoad: boolean = false
  tasks: ITask[] = []
  changedTask: ITask | undefined
  isViewConfirmWindow: boolean = false;
  isViewInformer: boolean = false;
  isError: boolean = false;
  message: string = '';
  filters: string[] = ['single', 'double', 'await']
  isViewSingle: boolean = true
  isViewDouble: boolean = true

  constructor(private taskService: TaskConfigService) {
  }

  ngOnInit(): void {
    this.loadTasks()
  }

  private loadTasks() {
    if (this.taskService.Tasks) {
      this.tasks = this.taskService.Tasks
      this.isLoad = true
    } else {
      this.taskService.getAllTasks().subscribe({
        next: (value) => {
          console.log(value)
          this.tasks = value
          this.taskService.Tasks = this.tasks
          this.isLoad = true
        },
        error: err => {
          console.log(err)
          this.isError = true
        }
      })
    }
  }

  addNewTask() {
    if (!this.tasks.find(t => t.id === 'new')) {
      const task = this.taskService.getEmptyTask()
      this.tasks.push(task)
      setTimeout(()=> {
        const el = document.getElementById('new-task')
        if (el){
          el.scrollIntoView({ behavior: 'smooth', block :"center"})
        }

      }, 200)
      // setTimeout(()=>  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 200)
    }
  }

  deleteUser() {
    if (this.changedTask) {
      console.log(this.changedTask)
      if (this.changedTask.id !== 'new')
        this.taskService.deleteTask(this.changedTask.id).subscribe({
          next: value => {
            this.tasks = this.tasks.filter(u => u.id !== value.id)
            this.taskService.Tasks = this.tasks
            this.isViewInformer = true
            this.message = 'Испытание удалено'
            this.startTimerCloseWindow()
          },
          error: err => {
            console.log(err)
            this.isViewInformer = true
            this.isError = true
            this.message = 'Испытание удалено'
            this.startTimerCloseWindow()
          }
        })
      else {
        console.log("!!!")
        this.tasks = this.tasks.filter(u => u.id !== 'new')
        this.taskService.Tasks = this.tasks
        this.isViewInformer = true
        this.message = 'Испытание удалено'
        this.startTimerCloseWindow()
      }
    }
    this.cancelModalWindow()
  }

  startTimerCloseWindow() {
    setTimeout(() => {
      this.cancelModalInformer()
    }, 1200)
  }

  cancelModalWindow() {
    this.isViewConfirmWindow = false
    this.isError = false
  }

  cancelModalInformer() {
    this.isViewInformer = false
    this.message = ''
  }

  saveTask(task: ITask) {
    if (task.id === 'new')
      this.taskService.createTask(task).subscribe({
        next: value => {
          const t = this.tasks.find(u => u.id === 'new')
          if (t)
            t.id = value.id
          this.isViewInformer = true
          this.message = 'Испытание сохранено'
          this.startTimerCloseWindow()
        },
        error: err => {
          console.log(err)
        }
      })
    else
      this.taskService.updateTask(task).subscribe({
        next: value => {
          console.log(value)
          this.isViewInformer = true
          this.message = 'Изменения сохранены'
          this.startTimerCloseWindow()
        },
        error: err => {
          console.log(err)
        }
      })
  }

  deleteRequestTask(task: ITask) {
    this.changedTask = task
    this.isViewConfirmWindow = true
  }

  copyTask(task: ITask) {
    if (!this.tasks.find(t => t.id === 'new')) {
      this.tasks.push({...task, id: 'new', title: task.title + ' (копия)'})
      // setTimeout(()=>  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 200)
      setTimeout(()=> {
        const el = document.getElementById('new-task')
        if (el){
          el.scrollIntoView({ behavior: 'smooth', block :"center"})
        }

      }, 200)
    }
  }

  addFilter(type: string) {
    if (this.filters.includes(type)){
      this.filters = this.filters.filter(f=>f !== type)
    } else {
      this.filters.push(type)
    }
  }
  getTasksByType(type: string): ITask[]{
    return this.tasks.filter(t=>t.type === type)
  }
}
