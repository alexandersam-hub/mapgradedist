import { Injectable } from '@angular/core';
import {IGame} from "../../domains/game/game.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {config} from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient) {
  }

  public getGames():Observable<IGame[]> {
    return this.http.get<IGame[]>(config.urlGame+'admin')
  }

  toArchive(game: IGame) {
    return this.http.put<IGame>(config.urlGame, game)
  }
}
