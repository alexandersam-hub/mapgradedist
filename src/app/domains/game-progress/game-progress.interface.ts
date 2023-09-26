import {IGame} from "../game/game.interface";
import {ITask} from "../task/task.interface";

export interface IRoundGame {
  singleTasks: ITask[]
  doubleTasks: ITask[]
  roundNumber:0
}
export interface IGameProgress {
  game: IGame
  isStart: boolean
  isFinish: boolean
  countConnectUser: number
  currentRound: number
  singleTasks: ITask[]
  doubleTasks: ITask[]
  isPause: boolean
  roundGame: IRoundGame
}
