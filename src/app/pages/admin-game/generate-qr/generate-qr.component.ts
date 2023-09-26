import {Component, Input, OnInit} from '@angular/core';
import {IGame} from "../../../domains/game/game.interface";

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css']
})
export class GenerateQrComponent implements OnInit{
  @Input() game: IGame | undefined
  urlDataList: {team: number, singleUrl: string}[] = []
  baseUrl: string = window.location.origin
  ngOnInit(): void {
    if (this.game){
      for(let i = 0; i<this.game.countTeam; i++) {
        const data={singleUrl: '', doubleUrl: '', team:i}
        data.singleUrl  =  `${this.baseUrl}/authorization/${this.game.code}/${i}`
        this.urlDataList.push(data)
      }
    }
    console.log(this.urlDataList)
  }

  downloadQR(team: number) {
    let qrEl: any
    let qrCodeURL: any;
    qrEl = document.getElementById('qr_'+team)?.firstChild
    if(qrEl){
      qrCodeURL = qrEl.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let aEl = document.createElement("a");
      aEl.href = qrCodeURL;
      aEl.download = `${this.game?.title??''}${team+1}_QR.png`
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);
    }
  }
}
