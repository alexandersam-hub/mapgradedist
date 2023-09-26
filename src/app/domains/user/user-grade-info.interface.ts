export interface IUserGradeInfo {
  user: string;
  age: string;
  gender: string;
  date: Date;
}

export class UserGradeInfo implements IUserGradeInfo{
  age: string;
  date: Date;
  gender: string;
  user: string;
  constructor(userCode: string) {
    this.age = '-'
    this.date = new Date(Date.now())
    this.user = userCode
    this.gender = '-'
  }
}
