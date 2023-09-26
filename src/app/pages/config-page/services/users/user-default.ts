import {IUser} from "../../../../domains/user/users.interface";
import {RolesEnum} from "../../../../domains/user/roles.enum";

export class UserDefault implements IUser{
  id: string;
  login: string;
  password: string;
  role: RolesEnum;
  stringName: string;

  constructor() {
    this.id = 'new'
    this.login = ''
    this.password = ''
    this.role = RolesEnum.admin
    this.stringName = ''
  }

}
