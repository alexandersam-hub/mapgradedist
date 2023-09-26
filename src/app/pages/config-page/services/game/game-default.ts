import {IGame} from "../../../../domains/game/game.interface";
import {ITask} from "../../../../domains/task/task.interface";
import {IUser} from "../../../../domains/user/users.interface";
import {UserDefault} from "../users/user-default";
import {IDescriptionTask} from "../../../../domains/game/description-task.interface";

export class GameDefault implements IGame{
  id: string;
  countTeam: number;
  isDouble: boolean;
  title: string;
  timeRound: number
  master: string;
  tasksSingle: string[];
  tasksDouble: string[]
  time: string;
  type: string;
  templateGame: { type: string; index: number; target: string }[];
  dateGame: string;
  code: number
  image: string
  maps
  isRequestUserGradeInfo: boolean
  isUserTimerView: boolean
  isArchive: boolean
  isAutoTeam: boolean
  logoImg:string;
  color: string;
  descriptionsTasks: IDescriptionTask;
  isViewTitleUser: boolean;
  mapImg: string
  constructor() {
    this.id = 'new'
    this.countTeam = 2
    this.timeRound = 0
    this.isDouble = false
    this.title = ''
    this.master = ''
    this.tasksSingle = []
    this.tasksDouble = []
    this.time = ''
    this.type = ''
    this.templateGame = [{type:'start', index:0, target:''}, {type: 'finish', index: 1, target: ''}]
    this.dateGame =''
    this.maps = {singleMap:[[]], doubleMap:[[]]}
    this.code = 0
    this.image = '';
    this.isRequestUserGradeInfo = false;
    this.isUserTimerView = false;
    this.isArchive = false
    this.isAutoTeam = false
    this.logoImg = ''
    this.color = ''
    this.descriptionsTasks = {
      start: {text: '', link: '', img: ''},
      finish: {text: '', link: '', img: ''},
      task: []
    }
    this.isViewTitleUser = true
    this.mapImg = ''
  }
}
