import {IGrade} from "../grade/grade.interface";

export interface IGradeResult {
  position: number;
  grade: IGrade;
  statistics: { userCode: string; answer: number[] }[];
}
