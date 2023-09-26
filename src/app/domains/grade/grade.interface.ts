import {ICriteria} from "./criteria.interface";

export interface IGrade {
  id: string
  title: string
  question: string
  criteria: ICriteria[]
}
