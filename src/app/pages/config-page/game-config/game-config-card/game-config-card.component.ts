import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGame} from "../../../../domains/game/game.interface";
import {IUser} from "../../../../domains/user/users.interface";
import {ITask} from "../../../../domains/task/task.interface";
import {IGrade} from "../../../../domains/grade/grade.interface";
import {TypeTaskEnum} from "../../../../domains/task/type-task.enum";
import {MapDoubleGenerator} from "./generate-map-double.service";
import {FileUploadService} from "../../services/fiile-upload-service/file-uplod.service";
import {imageGameUrl, imageLogoUrl, imageMapUrl, imageTaskUrl} from "../../../../../config";
import {ITypeGame} from "../../../../domains/type-game/type-game.interface";
@Component({
  selector: 'app-game-config-card',
  templateUrl: './game-config-card.component.html',
  styleUrls: ['./game-config-card.component.css'],
})
export class GameConfigCardComponent implements OnInit {
  @Input() game: IGame | undefined
  @Input() adminUsers: IUser[] = []
  @Input() grades: IGrade[] = []
  @Input() tasks: ITask[] = []
  @Input() isViewInformer: boolean = false
  @Input() isError: boolean = false
  @Input() message: string = ''
  @Input() typesGames: ITypeGame[] = []

  @Output() closeModalEmit = new EventEmitter<void>()
  @Output() saveGameEmitter = new EventEmitter<IGame>()
  @Output() cancelEmitter = new EventEmitter<void>()

  masterUser: IUser | undefined
  isViewUsers: boolean = false
  isViewTasks: boolean = false
  isPreviewPage: boolean = false
  countRound: number = 0
  imgUrl: string = imageGameUrl
  logoImgUrl: string = imageLogoUrl
  taskImgUrl: string = imageTaskUrl
  mapImgUrl: string = imageMapUrl
  color: string = ''
  isViewTaskTitle: boolean = false;
  constructor(private fileUploadService: FileUploadService) {
}
  ngOnInit() {
    if (this.game) {
      if (this.game.master) {
        this.masterUser = this.adminUsers.find(u => this.game && u.id === this.game.master)
      }
      if (this.game.templateGame) {
        this.rewriteTemplates()
      }
    }
  }

  saveGame() {
    if (this.game) {
      if (!this.game.isDouble){
        if (this.game.tasksDouble.length > 0){
          for (const t of  this.game.tasksDouble){
            this.game.descriptionsTasks.task =  this.game.descriptionsTasks.task.filter(task=>task.taskId !== t)
            this.game.tasksDouble = []
          }
        }
      }
      this.saveGameEmitter.emit(this.game)
    }
    // console.log(this.game-service)
  }

  cancel() {
    this.cancelEmitter.emit()
  }

  viewUsers() {
    this.isViewUsers = !this.isViewUsers
  }

  viewTasks() {
    this.isViewTasks = !this.isViewTasks
  }

  choiceMaster(user: IUser) {
    if (this.game) {
      this.game.master = user.id
      this.masterUser = user
    }
  }

  isSelectTask(task: ITask) {
    if (task.type === TypeTaskEnum.double) {
      return this.isSelectDoubleTask(task)
    } else {
      return this.isSelectSingleTask(task)
    }
  }

  isSelectSingleTask(task: ITask) {
    if (this.game)
      return !!this.game.tasksSingle.find(t => t === task.id)
    return false
  }

  isSelectDoubleTask(task: ITask) {
    if (this.game)
      return !!this.game.tasksDouble.find(t => t === task.id)
    return false
  }

  choiceTask(task: ITask) {
    if (task.type === TypeTaskEnum.double) {
      this.choiceDoubleTask(task)
    } else {
      this.choiceSingleTask(task)
    }
  }

  private choiceSingleTask(task: ITask) {
    if (this.game) {
      if (this.isSelectSingleTask(task)){
        this.game.tasksSingle = this.game.tasksSingle.filter(t => t !== task.id)
        this.game.descriptionsTasks.task = this.game.descriptionsTasks.task.filter(t => t.taskId !== task.id)
      }
      else {
        this.game.tasksSingle.push(task.id)
        this.game.descriptionsTasks.task.push({taskId:task.id, title:task.title, img:'', link: ''})
      }
    }
  }

  private choiceDoubleTask(task: ITask) {
    if (this.game) {
      if (this.isSelectDoubleTask(task)) {
        this.game.tasksDouble = this.game.tasksDouble.filter(t => t !== task.id)
        this.game.descriptionsTasks.task = this.game.descriptionsTasks.task.filter(t => t.taskId !== task.id)
      }
      else {
        this.game.tasksDouble.push(task.id)
        this.game.descriptionsTasks.task.push({taskId:task.id, title:task.title, img:'', link: ''})
      }
    }
  }


  createMapForTeam() {
    if(this.game && this.game.tasksSingle.find(t=>{
      const task = this.tasks.find(i=>i.id === t)
      return task && task.type === 'await'
    })){
      this.generateAwaitMap()
      return
    }
    this.createSingleMap()
    if (this.game && this.game.isDouble) {
      this.createDoubleMap(this.game.countTeam, this.game.tasksDouble.length)
    } else {
      if (this.game)
        this.game.maps.doubleMap = []
    }
  }
  private generateAwaitMap(){
    const map = []
    if (this.game) {
      for (let i = 0; i < this.game.countTeam; i++) {
        const mapTeam = []
        for (let j = 0; j < this.game.tasksSingle.length; j++) {
          mapTeam.push(j)
        }
        map.push(mapTeam)
      }
      this.game.maps.singleMap = map
    }
  }
  private createDoubleMap(countTeam: number, countTask: number) {
    const generatorMap = new MapDoubleGenerator(countTeam, countTask)
    if (this.game) {
      this.game.maps.doubleMap = generatorMap.generate()
    }
  }

  private createSingleMap() {
    const map = []
    let startIndexTask = 0
    if (this.game) {
      for (let i = 0; i < this.game.countTeam; i++) {
        const mapTeam = []
        let index = 0
        for (let j = 0; j < this.game.tasksSingle.length; j++) {
          let indexTask = index + startIndexTask
          if (this.game && indexTask >= this.game.tasksSingle.length) {
            index = 0 - startIndexTask
            indexTask = index + startIndexTask
          }
          mapTeam.push(indexTask)
          index++
        }
        startIndexTask++
        map.push(mapTeam)
      }
      this.game.maps.singleMap = map
    }
  }

  addTemplateTask() {
    if (this.game) {
      this.game.templateGame.splice(this.game.templateGame.length - 1, 1, {
        type: 'task',
        target: '',
        index: this.game.templateGame.filter(t => t.type == 'task').length
      }, {
        type: 'finish',
        target: '',
        index: this.game.templateGame.filter(t => t.type == 'task').length
      })
      this.writeCountRound()
    }
  }

  addTemplateGrade() {
    if (this.game) {
      this.game.templateGame.push({
        type: 'grade',
        target: '',
        index: this.game.templateGame.filter(t => t.type == 'grade').length
      })
    }
  }

  deleteItemTemplate(index: number) {
    if (this.game) {
      const removeElement = this.game.templateGame[index]
      this.game.templateGame = this.game.templateGame.filter((t, i) => i !== index)
      if (removeElement.type === 'task') {
        this.rewriteTemplates()
      }
    }
  }

  upItemTemplate(index: number) {
    if (this.game) {
      const current = this.game.templateGame[index]
      const next = this.game.templateGame[index - 1]
      this.game.templateGame[index] = next
      this.game.templateGame[index - 1] = current
    }
  }

  downItemTemplate(index: number) {
    if (this.game) {
      const current = this.game.templateGame[index]
      const next = this.game.templateGame[index + 1]
      this.game.templateGame[index] = next
      this.game.templateGame[index + 1] = current
    }
  }

  rewriteTemplates() {
    let countTask = 0
    if (this.game) {
      for (let t of this.game.templateGame) {
        if (t.type === 'task') {
          t.index = countTask
          countTask++
        }
      }
      this.writeCountRound()
    }
  }

  getTitleTask(taskId: string) {
    return this.tasks.find(t => t.id === taskId)?.title ?? 'не удалось найти данное задание'
  }

  writeCountRound(): void {
    if (this.game) {
      this.countRound = this.game.templateGame.filter(t => t.type === 'task').length
    } else {
      this.countRound = 0
    }
  }

  cancelModalInformer() {
   this.closeModalEmit.emit()
  }

  loadImage(event: any, typeImg: string, option?:{type: string, index: number}) {
    if (event.target.files && event.target.files.length && this.game) {
      const file: File = event.target.files[0];
      this.fileUploadService.saveImages(file, typeImg).subscribe({
        next: value => {
          console.log(value)
          if (this.game){
            switch (typeImg) {
              case 'game':
                this.game.image = value.name
                break
              case 'map':
                this.game.mapImg = value.name
                break
              case 'logo':
                this.game.logoImg = value.name
                break
              case 'task':
                if (option){
                  switch (option.type){
                    case 'start':
                      this.game.descriptionsTasks.start.img = value.name
                      break
                    case 'finish':
                      this.game.descriptionsTasks.finish.img = value.name
                      break
                    case 'task':
                      this.game.descriptionsTasks.task[option.index].img = value.name
                      break
                  }
                }
                break
            }

          }
        }, error: err => {
          console.log(err)
        }
      });
    }
  }

  setViewTaskTitle() {
    this.isViewTaskTitle = !this.isViewTaskTitle
  }

  setIsPreview(){
    this.isPreviewPage = !this.isPreviewPage
  }
}
