import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameAdminProcessService} from "../../../services/game-service/game-admin-process.service";
import {UserService} from "../../../services/user-service/user.service";
import {IGameProgress} from "../../../domains/game-progress/game-progress.interface";
import {IGradeResult} from "../../../domains/game-progress/grader-result.interface";
import {imageMapUrl} from "../../../../config";

export enum typeUser {
  'single' = 'single',
  'double' = 'double'
}
@Component({
  selector: 'app-game-admin-page',
  templateUrl: './game-admin-page.component.html',
  styleUrls: ['./game-admin-page.component.css']
})
export class GameAdminPageComponent implements OnInit{
  gameProgress: IGameProgress | null
  time: number | undefined
  grades: IGradeResult[] = []
  qrData:{teamNumber: number, type: string} | undefined
  isGenerateQR: boolean = false
  baseUrl: string = window.location.origin
  urlQr:string = ''
  isError: boolean = false
  message: string = ''
  isViewTh: boolean = true
  isViewConfirmRefresh: boolean = false
  isLoad: boolean = false;
  mapImUrl = imageMapUrl
  constructor(private route: ActivatedRoute, private  router: Router, private gameProcessService: GameAdminProcessService, private userService: UserService) {
    this.gameProgress = null
  }
  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (!gameId) {
      console.log('not game id', gameId)
      this.router.navigate(['/authorization'])
      return
    }
    this.gameProcessService.observeConnect().subscribe({
      next: () => {
        console.log('connect')
        if (gameId)
          this.gameProcessService.loginAdmin(gameId, this.userService.getToken())
      },
      error: err => {
        console.log(err)
      }
    })
    if (gameId)
      this.gameProcessService.loginAdmin(gameId, this.userService.getToken())
    this.observerMessage()
    this.observeConnect()
    this.observeErrorMessage()
  }

  observeErrorMessage(){
    this.gameProcessService.subscribeError().subscribe({
      next:value => {
        console.log(value)
        this.isError = true
        this.message = value.message
      }
    })
  }
  observeConnect(){
    this.gameProcessService.connectTest()
  }
  observerMessage(){
    this.gameProcessService.getGameMessage().subscribe({
      next:(value)=>{
        console.log(value)
        if (!this.isLoad){
          this.isLoad = true
        }
        this.gameProgress = value
      },
      error: err => {
        console.log(err)
      }
    })

    this.gameProcessService.observeTime().subscribe({
      next: (value) => {
        this.time = value.time
      },
      error: err=>{
        console.log(err)
      }
    })
    this.gameProcessService.observerGrade().subscribe({
      next: value => {
        console.log(value)
        this.grades = value
      },
      error: err=>{
        console.log(err)
      }
    })
  }

  startGame() {
    if (this.gameProgress) {
      this.gameProcessService.sendCommandGame(this.gameProgress.game.id, 'start')
    }
  }

  stopGame() {
    if (this.gameProgress) {
      this.gameProcessService.sendCommandGame(this.gameProgress.game.id, 'stop')
    }
  }
  refreshGame() {
    if (this.gameProgress) {
      this.gameProcessService.sendCommandGame(this.gameProgress.game.id, 'refresh')
      this.time = undefined
      this.isLoad = false
      this.isViewConfirmRefresh = false
    }
  }

  sendNextRound() {
    if (this.gameProgress) {
      this.gameProcessService.sendCommandGame(this.gameProgress.game.id, 'next_round')
    }
  }

  downloadQR() {
    let qrEl: any
    let qrCodeURL: any;
    qrEl = document.getElementById('qr')?.firstChild
      if(qrEl){
        qrCodeURL = qrEl.toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = `${(this.qrData?.teamNumber??0 )+1}_${this.qrData?.type??''}_QR.png`
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
      }
  }

  generateQR(){
    this.qrData = {teamNumber:0, type: 'single'}
    this.generateUrlQR()
    this.isGenerateQR = !this.isGenerateQR
  }

  generateUrlQR() {
    console.log(this.qrData)
    this.urlQr = `${this.baseUrl}/game/${this.gameProgress?.game.id??''}/${this.qrData?.teamNumber??''}/${this.qrData?.type??''}`
  }

  sendControlTimer(isView: boolean) {
    if (this.gameProgress)
      if (isView)
        this.gameProcessService.sendCommandGame(this.gameProgress.game.id, 'user-timer-true')
    else
        this.gameProcessService.sendCommandGame(this.gameProgress.game.id, 'user-timer-false')
  }

  closeModalInformer() {
    this.isError = false
  }

  requestRefreshGame() {
    this.isViewConfirmRefresh = true
  }
  closeConfirmWindow(){
    this.isViewConfirmRefresh = false
  }
}
