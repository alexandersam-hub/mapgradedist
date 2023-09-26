import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GameUserProcessService} from "../../services/game-service/game-user-process.service";
import {IGameInfoUser} from "../../domains/game-progress/game-info-user.interface";
import {IUserGradeInfo, UserGradeInfo} from "../../domains/user/user-grade-info.interface";
import {imageGameUrl, imageMapUrl} from "../../../config";

@Component({
  selector: 'app-user-game-service',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.css']
})
export class UserGameComponent implements OnInit {

  gameId: string | null = null
  teamCode: number | null = null
  stringType: string = ''
  userCode: string | null = null
  isError: boolean = false
  message: string = ''
  userType: string | null = null
  gameInfo: IGameInfoUser | undefined
  isViewUserInfo: boolean = false
  isGetUserInfo: boolean = false
  userGradeInfo: IUserGradeInfo | undefined
  urlImage: string = imageGameUrl
  time: number | undefined
  messageUserInfo: string = ''
  isLoad: boolean  = false
  mapImgUrl: string = imageMapUrl
  isViewMap: boolean = false;
  constructor(private router: Router, private gameUserProcessService: GameUserProcessService) {
  }
  closeModalInfo(){
    this.isViewUserInfo = false
  }
  viewModalInfo(){
    this.isViewUserInfo = true
  }
  ngOnInit(): void {
    this.gameId = localStorage.getItem('game');
    const teamNumberString = localStorage.getItem('team')
    this.userType = localStorage.getItem('type') ?? ''
    if (! this.gameId || !teamNumberString || !this.userType){
      this.router.navigate(['/','authorization'])
      return
    }
    switch (this.userType){
      case 'double':
        this.stringType = 'парные'
        break
      case 'single':
        this.stringType = 'одиночные'
        break
      default:
        this.stringType = ''
    }
    if (teamNumberString) {
      this.teamCode = Number.parseInt(teamNumberString)
    }
    this.gameUserProcessService.connectTest()

    this.gameUserProcessService.subscribeConnect().subscribe({
      next: () => {
        this.login()
      },
      error: err => {
        console.log(err)
      }
    })

    this.connectServer()
  }

  connectServer() {
    this.login()
    this.subscribeError()
    this.subscribeGameInfo()
    this.subscribeLogin()
    this.subscribeTime()
    this.subscribeUserType()
  }


  private login() {
    if (this.gameId && typeof this.teamCode === 'number' && this.userType) {
      const code= localStorage.getItem('code')??''
      this.gameUserProcessService.login(this.gameId, this.teamCode, code, this.userType)
    } else {
      this.isError = true
      this.message = 'неверные данные для входа'
    }

  }

  private subscribeError() {
    this.gameUserProcessService.subscribeError().subscribe({
      next: value => {
        if (value.message === 'Уже существует ответ на данный опрос'){
          window.location.reload()
        } else {
          console.log(value)
          this.isError = true
          this.message = value.message
        }

      },
      error: err => {
        console.log(err)
      }
    })
  }
  private subscribeTime() {
    this.gameUserProcessService.subscribeTimeGame().subscribe({
      next: value => {
        this.time = value.time
      },
      error: err => {
        console.log(err)
      }
    })
  }
  private subscribeGameInfo() {
    this.gameUserProcessService.subscribeUserInfo().subscribe({
      next: value => {
        this.isGetUserInfo = true
        this.userGradeInfo = new UserGradeInfo(value.code)
      },
      error: err=>{
        console.log(err)
      }
    })
    this.gameUserProcessService.subscribeGameInfo().subscribe({
      next: value => {
        this.gameInfo = value
        console.log(value)
        this.isLoad = true
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private subscribeLogin() {
    this.gameUserProcessService.subscribeLogin().subscribe({
      next: value => {
        console.log()
        localStorage.setItem('code', value.code)
        this.userCode = value.code
      },
      error: err => {
        console.log(err)
      }
    })
  }

  chooseGrade(grades: number[]) {
    if (this.gameInfo && this.gameInfo.grade.grade){
      this.gameUserProcessService.sendMessage('grade', {
        game: this.gameId,
        user: this.userCode,
        answer: grades,
        position:  this.gameInfo.grade.position,
        grade: this.gameInfo.grade.grade.id,
        team: this.teamCode,
        type: this.userType,
      })
    }
  }

  sendUserGradeInfo() {
    if (this.userGradeInfo && this.userGradeInfo.age !=='-' && this.userGradeInfo.gender!=='-'){
      this.gameUserProcessService.sendMessage('user-grade-info', {info: this.userGradeInfo, game: this.gameId})
      this.isGetUserInfo = false
    } else {
      this.messageUserInfo = 'заполнены не все поля'
    }

  }

  sendTypeUser() {
    const type = this.userType === 'single'?'double':'single'
    this.gameUserProcessService.sendTypeUser({game: this.gameId??'', type, user: this.userCode??''})
  }

  subscribeUserType(){
    this.gameUserProcessService.observableTypeUser().subscribe({
      next:(value)=>{
        console.log(value)
        this.userType = value.type
        switch (this.userType){
          case 'double':
            this.stringType = 'парные'
            break
          case 'single':
            this.stringType = 'одиночные'
            break
          default:
            this.stringType = ''
        }

      },
      error: err => {
        this.isError = true
        this.message = err.error.message
      }
    })
  }

  setViewMap() {
    this.isViewMap = !this.isViewMap
  }
}
