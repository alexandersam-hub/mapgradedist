import {Injectable} from '@angular/core';
import {IUser} from "../../../../domains/user/users.interface";
import {UserDefault} from "./user-default";
import {HttpClient} from "@angular/common/http";
import {config} from "../../../../../config";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  users: IUser[] | undefined

  constructor(private http: HttpClient) {
  }

  public getAllUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(config.urlUser)
  }

  public saveUser(user: IUser): Observable<IUser> {
    if (user.id === 'new') {
      return this.http.post<IUser>(config.urlUser, user)
    } else {
      return this.http.put<IUser>(config.urlUser, user)

    }
  }

  public deleteUser(userId: string) {
    return this.http.delete<IUser>(config.urlUser + userId)
  }

  public getNewUser(): IUser {
    return new UserDefault()
  }

  set Users(users: IUser[]) {
    this.users = users
  }

  get Users(): IUser[] | undefined {
    return this.users
  }

  public getAdminUsers(): IUser[] {
    if (this.users)
      return this.users.filter(u => u.role === 'admin')
    return []
  }
}
