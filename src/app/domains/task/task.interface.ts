import {TypeTaskEnum} from "./type-task.enum";

export interface ITask {
  id: string
  type: string
  title: string
  duration: number
  description: string

  localTitle?: string
  img?: string
  link?: string
}
