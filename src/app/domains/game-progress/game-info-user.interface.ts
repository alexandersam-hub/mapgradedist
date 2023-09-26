import {ITask} from "../task/task.interface";
import {IGrade} from "../grade/grade.interface";

export interface IGameInfoUser {
  titleGame: string;
  task: ITask;
  grade: {position: number, grade:IGrade};
  isStart: boolean;
  isFinish: boolean;
  isPause: boolean;
  image: string;
  isDouble: boolean;
  basicColor: string;
  logoImg: string;
  map: string;
  isViewTitle: boolean
}
