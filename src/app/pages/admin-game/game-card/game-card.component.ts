import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGame} from "../../../domains/game/game.interface";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit{
  @Input() game: IGame | undefined
  @Output() generateQrEmit = new EventEmitter<IGame>()
  @Output() viewStatisticEmit = new EventEmitter<IGame>()
  @Output() toArchiveEmit = new EventEmitter<IGame>()
  isViewStatisticButton: boolean = false
  baseUrl: string = window.location.origin

  ngOnInit() {
    if (this.game){
      this.isViewStatisticButton = !!this.game.templateGame.find(t=>t.type==='grade')
    }
  }

  generateQR() {
    if (this.game)
      this.generateQrEmit.emit(this.game)
  }

  viewStatistic(){
    if (this.game){
      this.viewStatisticEmit.emit(this.game)
    }
  }


  toArchive() {
    if (this.game)
      this.toArchiveEmit.emit(this.game)
  }

  downloadQR(id: string) {
    if (this.game){
      let qrEl: any
      let qrCodeURL: any;
      qrEl = document.getElementById('qr_'+id)?.firstChild
      if(qrEl){
        qrCodeURL = qrEl.toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = `${this.game.title}_QR.png`
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
      }
    }
  }

  getUrlGameAuth(code: number): string {
      return  `${this.baseUrl}/authorization/${code}`
  }
}
