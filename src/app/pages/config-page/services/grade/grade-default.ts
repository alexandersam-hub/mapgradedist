import {IGrade} from "../../../../domains/grade/grade.interface";
import {ICriteria} from "../../../../domains/grade/criteria.interface";

export class GradeDefault implements IGrade {
  criteria: ICriteria[];
  id: string;
  question: string;
  title: string;
  constructor() {
    this.id = 'new'
    this.title = ''
    this.question = ''
    this.criteria = [{text:''}]
  }
}
