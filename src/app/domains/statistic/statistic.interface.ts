import {IGrade} from "../grade/grade.interface";

export interface IStatistic {
  id: string;
  game: string;
  result: IStatisticResult[];
}
export interface IStatisticRound {
  userCode: string;
  answer: number[];
}
export interface IStatisticResult {
  position: number;
  grade: IGrade;
  statistics: IStatisticRound[];
}
