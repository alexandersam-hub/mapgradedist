import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITypeGame} from "../../domains/type-game/type-game.interface";
import {config} from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class TypeGameService {
  typesGames: ITypeGame[] | undefined

  constructor(private http: HttpClient) { }
  public getTypeGame(){
    return this.http.get<ITypeGame[]>(config.urlTypeGame)
  }
  public createTypeGame(typeGame: ITypeGame){
    return this.http.post<ITypeGame>(config.urlTypeGame, typeGame)
  }
  public updateTypeGame(typeGame: ITypeGame){
    return this.http.put<ITypeGame>(config.urlTypeGame, typeGame)
  }
  public deleteTypeGame(id: string){
    return this.http.delete<ITypeGame>(config.urlTypeGame + id+'/')
  }

  getEmptyTypeGame(): ITypeGame {
    return {id: 'new', type: ''}
  }
}
