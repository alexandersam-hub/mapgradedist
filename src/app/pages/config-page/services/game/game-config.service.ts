import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameDefault} from "./game-default";
import {IGame} from "../../../../domains/game/game.interface";
import {Observable} from "rxjs";
import {config} from "../../../../../config";

@Injectable({
  providedIn: 'root'
})
export class GameConfigService {

  games: IGame[] | undefined
  constructor(private http: HttpClient) { }
  get Games () {
    return this.games
  }

  set Games (games) {
    this.games = games
  }
  createGame(game: IGame): Observable<IGame> {
    return this.http.post<IGame>(config.urlGame, game)
  }

  updateGame(game: IGame): Observable<IGame> {
    return this.http.put<IGame>(config.urlGame, game)
  }

  getGames():Observable<IGame[]>{
    return this.http.get<IGame[]>(config.urlGame)
  }

  getEmptyGame(): IGame {
    return new GameDefault()
  }

  deleteGame(id: string){
    return this.http.delete<IGame>(config.urlGame + id)
  }
}
