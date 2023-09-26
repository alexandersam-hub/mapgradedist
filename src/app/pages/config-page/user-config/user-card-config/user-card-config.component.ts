import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from "../../../../domains/user/users.interface";
import {RolesEnum} from "../../../../domains/user/roles.enum";

@Component({
  selector: 'app-user-card-config',
  templateUrl: './user-card-config.component.html',
  styleUrls: ['./user-card-config.component.css']
})
export class UserCardConfigComponent {
  @Input() user: IUser | undefined

  @Output() saveUser$ = new EventEmitter<IUser>()
  @Output() deleteUser$ = new EventEmitter<IUser>()

  isChanged: boolean = false
  roles = RolesEnum
  baseUrl: string = window.location.origin
  saveUser(){
    this.saveUser$.emit(this.user)
  }

  deleteUser(){
    if (this.user)
      this.deleteUser$.emit(this.user)
  }

  changeField() {
    this.isChanged = true
  }

  downloadQR(login: string) {
    let qrEl: any
    let qrCodeURL: any;
    qrEl = document.getElementById('qr_'+login)?.firstChild
    if(qrEl){
      qrCodeURL = qrEl.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let aEl = document.createElement("a");
      aEl.href = qrCodeURL;
      aEl.download = `${login}_QR.png`
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);
    }
  }

  getUrl(login: string, password: string): string {
    return `${this.baseUrl}/login/${login}/${password}`
  }
}
