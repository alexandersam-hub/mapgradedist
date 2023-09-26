import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-qr',
  templateUrl: './login-qr.component.html',
  styleUrls: ['./login-qr.component.css']
})
export class LoginQrComponent implements OnInit{
  isError: boolean = false
  message: string = ''
  constructor(private route: ActivatedRoute,  private router: Router) {
  }
  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('game');
    const teamNumberString = this.route.snapshot.paramMap.get('team')??''
    const teamNumber = parseInt(teamNumberString)
    const userType = this.route.snapshot.paramMap.get('type')
    if (!gameId || !teamNumberString || !userType || !Number.isInteger(teamNumber)){
      this.isError = true
      this.message = 'неверный QR'
      return
    }
    localStorage.setItem('team', teamNumberString)
    localStorage.setItem('game', gameId)
    localStorage.setItem('type', userType)
    this.router.navigate(['/'])
  }

}
