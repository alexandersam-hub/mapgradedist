import {ITask} from "../../../../domains/task/task.interface";
import {TypeTaskEnum} from "../../../../domains/task/type-task.enum";

export class TaskDefault implements ITask{
  id: string;
  duration: number;
  localName: string;
  title: string;
  type: TypeTaskEnum;
  description: string;

  constructor() {
    this.id = 'new'
    this.duration = 1
    this.localName = ''
    this.title = ''
    this.type = TypeTaskEnum.single
    this.description = ''
  }



}
