import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {IGameProgress} from "../../domains/game-progress/game-progress.interface";
import {IGradeResult} from "../../domains/game-progress/grader-result.interface";
@Injectable({
  providedIn: 'root'
})
export class GameAdminProcessService {
  isPingSend: boolean = false
  constructor(private socket: Socket) { }

  public observerGrade():Observable<IGradeResult[]>{
    return this.socket.fromEvent<IGradeResult[]>('grade')
  }
  public getGameMessage(): Observable<IGameProgress>{
    return this.socket.fromEvent<IGameProgress>('game')
  }
  public loginAdmin(gameId: string, token: string) {
    this.socket.emit('login', {game:gameId, token})
  }
  public observeDisconnect() {
    return this.socket.fromEvent('disconnect')
  }
  public observeConnect() {
    return this.socket.fromEvent('connect')
  }

  sendCommandGame(gameId: string, command: string) {
    this.socket.emit('control', {game:gameId, command})
  }

  public observeTime(): Observable<{time:number}>{
    return this.socket.fromEvent('time')
  }
  public connectTest(){
    console.log('connectTest')
    this.subscribePing()
    setInterval(()=>{
      this.isPingSend = true
      this.sendPing()
      setTimeout(
        ()=>{
          if(this.isPingSend){
            this.socket.disconnect()
            this.socket.connect()
            console.log('refresh connect')
          }
        }
        ,1000)
    },2000)
  }
  public subscribeError() {
    return this.socket.fromEvent<{ message: string }>('error')
  }

  private subscribePing(){
    this.socket.fromEvent('ping').subscribe({
      next: value => {
        this.isPingSend = false
      }
    })
  }
  private sendPing(){
    this.socket.emit('ping', {message: 'ping'})
  }
}
