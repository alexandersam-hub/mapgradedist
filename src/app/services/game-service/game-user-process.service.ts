import {Injectable, OnInit} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable, timeout} from "rxjs";
import {IGameInfoUser} from "../../domains/game-progress/game-info-user.interface";

@Injectable({
  providedIn: 'root'
})
export class GameUserProcessService {
  isPingSend: boolean = false;

  constructor(private socket: Socket) { }

  public login(gameId: string, teamCode: number, userCode: string | null, userType: string){
    this.socket.emit('login', {game: gameId, team: teamCode, code: userCode, type: userType})
  }

  public subscribeGameInfo(): Observable<IGameInfoUser> {
    return this.socket.fromEvent<IGameInfoUser>('game')
  }

 public subscribeUserInfo(): Observable<{code: string}> {
    return this.socket.fromEvent<{code: string}>('user-info')
  }

  public subscribeError() {
    return this.socket.fromEvent<{ message: string }>('error')
  }

  public sendMessage(action:string, message: any) {
    this.socket.emit(action, message)
  }

  subscribeLogin() {
    return this.socket.fromEvent<{code: string}>('login')
  }

  subscribeConnect() {
    return this.socket.fromEvent('connect')
  }

  subscribeTimeGame() {
    return this.socket.fromEvent<{ time: number }>('time')
  }
  subscribeDisconnect() {
    return this.socket.fromEvent('disconnect')
  }

  public connectTest(){
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

  sendTypeUser(param: { game: string; type: string; user: string}) {
    this.socket.emit('choice-type-user', param)
  }
  observableTypeUser(): Observable<{type: string}>{
    return this.socket.fromEvent<{type:string}>('choice-type-user')
  }
}
