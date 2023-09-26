import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../../services/statistic-service/statistic.service";
import {GameService} from "../../services/game-service/game.service";
import {TaskService} from "../../services/task-service/task.service";
import {IGame} from "../../domains/game/game.interface";
import {IStatistic, IStatisticResult} from "../../domains/statistic/statistic.interface";
import {ITask} from "../../domains/task/task.interface";
import {ITypeGame} from "../../domains/type-game/type-game.interface";
import {TypeGameService} from "../../services/type-game-service/type-game.service";
import {IGradeResult} from "../../domains/game-progress/grader-result.interface";
import {config} from "../../../config";
import {filter} from "rxjs";

@Component({
  selector: 'app-grade-view-page',
  templateUrl: './grade-view-page.component.html',
  styleUrls: ['./grade-view-page.component.css']
})
export class GradeViewPageComponent implements OnInit {
  errorMessage: string = ''
  choiceGame: string = ''
  statisticFullData: { selected: boolean, game: IGame, countAnswers: number, countStage: number, results: IStatisticResult[] }[] | undefined
  games: IGame[] = []
  statistics: IStatistic[] = []
  tasks: ITask[] = []
  types: ITypeGame[] = []
  isLoadGames: boolean = false
  isLoadTasks: boolean = false
  isLoadStatistics: boolean = false
  isLoadTypes: boolean = false;
  tableGrades: IGradeResult[] = []
  filters: string[] = []
  urlLoad = config.urlLoadExcelStatistic
  gamesList: string[] = []
  constructor(private statisticService: StatisticService, private gameService: GameService, private taskService: TaskService, private typeService: TypeGameService) {
  }

  ngOnInit(): void {
    this.loadGames()
    this.loadTasks()
    this.loadStatistics()
    this.loadTypes()
  }

  loadTypes() {
    this.typeService.getTypeGame().subscribe({
      next: value => {
        this.types = value
        // for (const t of value) {
        //   this.filters.push(t.type)
        // }
        this.isLoadTypes = true
      },
      error: err => {
        console.log(err)
        this.isLoadTypes = true
        this.errorMessage = err.error.message
      }
    })
  }

  loadGames() {
    this.gameService.getGames().subscribe({
      next: value => {
        this.games = value
        if (value.length > 0) {
          this.choiceGame = value[0].id
        }
        this.isLoadGames = true
      },
      error: err => {
        console.log(err)
        this.isLoadGames = true
        this.errorMessage = err.error.message
      }
    })
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: value => {
        this.tasks = value
        this.isLoadTasks = true
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.message
        this.isLoadTasks = true
      }
    })
  }

  loadStatistics() {
    this.statisticService.getAll().subscribe({
      next: value => {
        console.log(value)
        this.statistics = value
        this.isLoadStatistics = true
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.message
        this.isLoadStatistics = true
      }
    })
  }

  closeModalInformer() {
    this.errorMessage = ''
  }

  getStaticFull() {
    const statisticsFullData = []
    this.gamesList = []
    for (const g of this.games) {
      let countAnswers = 0
      const gradeGame = this.statistics.find(s => s.game === g.id)
      if (!gradeGame || !this.filters.includes(g.type)) continue;
      for (const r of gradeGame.result) {
        countAnswers += r.statistics.length
      }
      this.gamesList.push(g.id)
      statisticsFullData.push({
        game: g,
        selected: true,
        countAnswers,
        countStage: gradeGame.result.length,
        results: gradeGame.result
      })
    }
    console.log( this.gamesList)
    this.statisticFullData = statisticsFullData
    return statisticsFullData
  }

  generateTable() {
    const result: IGradeResult[] = []
    if (this.statisticFullData)
    for (const g of this.statisticFullData) {
      if (!g.selected) continue
      for (const r of g.results){
        if (r.position >= result.length){
          result.push({grade: r.grade, position: r.position, statistics: r.statistics})
        } else {
          result[r.position].statistics = [...result[r.position].statistics, ...r.statistics]
        }
      }
    }
    this.tableGrades = result
  }

  checkGame(gameIndex: number) {
    if (this.statisticFullData){
      this.statisticFullData[gameIndex].selected = !this.statisticFullData[gameIndex].selected
      const id =  this.statisticFullData[gameIndex].game.id
      if ( this.gamesList.includes(id)) {
        this.gamesList = this.gamesList.filter(g=> g !== id)
      } else {
        this.gamesList.push(this.statisticFullData[gameIndex].game.id)
      }
      console.log( this.gamesList)
    }

  }

  // checkIsFilter(type: string): boolean {
  //   return
  // }

  addFilter(type: string) {
    if (this.filters.includes(type)){
      this.filters = this.filters.filter(f=>f !== type)
    } else {
      this.filters.push(type)
    }
    this.getStaticFull()
  }

  protected readonly JSON = JSON;

}
