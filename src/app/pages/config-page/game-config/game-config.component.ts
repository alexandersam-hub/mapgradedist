import {Component, OnInit} from '@angular/core';
import {IGame} from "../../../domains/game/game.interface";
import {GameConfigService} from "../services/game/game-config.service";
import {IUser} from "../../../domains/user/users.interface";
import {UserConfigService} from "../services/users/user-config.service";
import {TaskConfigService} from "../services/task/task-config.service";
import {ITask} from "../../../domains/task/task.interface";
import {IGrade} from "../../../domains/grade/grade.interface";
import {GradeConfigService} from "../services/grade/grade-config.service";
import {ITypeGame} from "../../../domains/type-game/type-game.interface";
import {TypeGameService} from "../../../services/type-game-service/type-game.service";

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit{
  games: IGame[] = []
  adminUsers: IUser[] = []
  tasks: ITask[] = []
  grades: IGrade[] = []
  typesGames: ITypeGame[] = []

  changedGame: IGame|null = null

  isLoadGames: boolean = false
  isLoadTypesGames: boolean = false
  isLoadUsers: boolean = false
  isLoadTasks: boolean = false
  isLoadGrades: boolean = false

  isViewInformer: boolean = false
  isError: boolean = false
  message: string = ''
  isViewConfirmWindow: boolean = false;
  deletedGame: IGame|null = null;
  constructor(private gameService: GameConfigService,
              private gradeService: GradeConfigService,
              private userService: UserConfigService,
              private typeGameService: TypeGameService,
              private taskService: TaskConfigService) {
  }
  ngOnInit(): void {
    this.loadGames()
    this.loadUsers()
    this.loadTasks()
    this.loadGrades()
    this.loadTypesGames()
  }

  loadTypesGames(){
    if(this.typeGameService.typesGames) {
      this.typesGames = this.typeGameService.typesGames
      this.isLoadTypesGames = true
    } else {
      this.typeGameService.getTypeGame().subscribe({
        next: value => {
          this.typeGameService.typesGames = value
          this.typesGames = value
          this.isLoadTypesGames = true
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
  loadGrades(){
    if(this.gradeService.Grades) {
      this.grades = this.gradeService.Grades
      this.isLoadGrades = true
    } else {
      this.gradeService.getGrades().subscribe({
        next: value => {
          this.grades = value
          this.gradeService.Grades = this.grades
          this.isLoadGrades = true
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  private loadGames() {
    if (this.gameService.Games){
      this.games = this.gameService.Games
      this.isLoadGames = true
    } else {
      this.gameService.getGames().subscribe({
        next:value => {
          this.games = value
          this.gameService.Games = this.games
          this.isLoadGames = true
        },
        error: err => {
          console.log(err)
        }
      })
    }

  }

  private loadUsers(){
    if (this.userService.Users) {
      this.adminUsers = this.userService.getAdminUsers()
      this.isLoadUsers = true
    } else {
      this.userService.getAllUser().subscribe({
        next: value => {
          this.userService.Users = value
          this.adminUsers = this.userService.getAdminUsers()
          this.isLoadUsers = true
        },
        error: err => {

        }
      })
    }
  }
  private loadTasks() {
    if (this.taskService.Tasks) {
      this.tasks = this.taskService.Tasks
      this.isLoadTasks = true
    } else {
      this.taskService.getAllTasks().subscribe({
        next: value => {
          this.tasks = value
          this.taskService.Tasks = value
          this.isLoadTasks = true
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
  addEmptyGame() {
    const newGame = this.gameService.getEmptyGame()
    this.changedGame = newGame
  }

  saveGame(game: IGame) {
    if (game.id === 'new') {
      this.gameService.createGame(game).subscribe({
        next: value => {
          this.games.push(value)
          this.message = 'игра сохранена'
          this.isViewInformer = true
        },
        error: err => {
          console.log(err)
          this.message = 'Не удалось сохранить игру. '
          if (err.error.message){
            if (Array.isArray(err.error.message) && err.error.message[0]){
              this.message += err.error.message[0]
            } else {
              this.message += err.error.message
            }

          }
          this.isViewInformer = true
        }
      })
    } else {
      this.gameService.updateGame(game).subscribe({
        next: value => {
          this.games.forEach((g, i)=>{
            if (g.id === 'new') {
              this.games[i] = value
            }
          })
          this.message = 'игра сохранена'
          this.isViewInformer = true
        },

        error: err => {
          console.log(err)
        }
      })
    }
  }

  cancelRedactGame(){
    this.changedGame = null
  }


  setChangeGame(game: IGame) {
    this.changedGame = game
  }

  deleteGame() {
    if (!this.deletedGame)
      return
    this.gameService.deleteGame(this.deletedGame.id).subscribe({
      next: value => {
        this.games = this.games.filter(g=>g.id !== value.id)
        this.gameService.Games = this.games
      },
      error: err=>{
        console.log(err)
      }
    })
    this.deletedGame = null
    this.isViewConfirmWindow = false
  }

  copyGame(game: IGame) {
    this.changedGame = {...game, id: 'new', title: game.title + " (копия)", code:-1}
  }
  closeModal(){
      this.isViewInformer = false
      this.message = ''
      this.isError = false
  }
  requestDeleteGame(game:IGame) {
    this.deletedGame = game
    this.isViewConfirmWindow = true
  }

  cancelModalWindow() {
    this.isViewConfirmWindow = false
    this.deletedGame = null
  }
}
