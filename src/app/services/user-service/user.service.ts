import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "../../../config";
import {ITokenData} from "../../domains/user/token-data.interface";
import {Observable} from "rxjs";
import {ILoginData} from "../../domains/user/login-data.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string | null
  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token')
  }


  public loginAdmin(loginData: ILoginData): Observable<ITokenData> {
      return this.http.post<ITokenData>(config.urlLogin, loginData)
  }
  getToken() {
    this.token = this.token?? localStorage.getItem('token')
    if (!this.token) {
      this.router.navigate(['/authorization']);
      return ``;
    } else return this.token;
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('token', token)
    this.router.navigate(['/'])
  }

  loginGamer(codeGame: string) {
    return this.http.post<{isTeamCode: boolean, isDouble: boolean, team: number, title: string, countTeam: number, gameId: string}>(config.urlLoginGamer, {code: codeGame})
  }
}
