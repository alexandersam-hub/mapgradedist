import {Component, OnInit} from '@angular/core';
import {ILoginData} from "../../domains/user/login-data.interface";
import {UserService} from "../../services/user-service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  isLoad: boolean = true
  loginData: ILoginData
  errorMessage: string = ''
  errorMessageGamer: string = ''
  codeGame: string = ''
  teamCode: number|undefined
  typeGamer: string = ''
  isChoiceTeam: boolean = false
  isChoiceTypeGamer: boolean = false
  countTeam: number = -1
  titleGame: string = ''
  teams: number[] = []
  gameId: string = ''
  isDoubleTask: boolean = false

  ngOnInit(){
    this.teamCode = parseInt(this.route.snapshot.paramMap.get('team')??'')??undefined;
    this.codeGame = this.route.snapshot.paramMap.get('game')??''
    const codeGame = parseInt(this.codeGame);
    console.log(this.teamCode, Number.isInteger(codeGame),  this.codeGame)
    if (Number.isInteger(codeGame)){
      this.loginGamer()
    }
  }
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.loginData = {login:'', password:''}
  }

  login() {
    this.isLoad = false
    this.userService.loginAdmin(this.loginData).subscribe({
      next: value => {
        this.isLoad = true
        this.userService.setToken(value.token)
        this.router.navigate(['/','admin'])
      }, error:err => {
        console.log(err)
        this.isLoad = true
        this.errorMessage = err.error.message
      }
    })
  }

  loginGamer(){
    const code = parseInt(this.codeGame)
    this.isLoad = false
    if (Number.isInteger(code)) {
      this.errorMessageGamer = ''
      this.userService.loginGamer(this.codeGame).subscribe({
        next: value => {
          this.gameId = value.gameId
          this.titleGame = value.title
          this.countTeam = value.countTeam
          this.isDoubleTask = value.isDouble
          if (value.isTeamCode){
            this.teamCode = value.team
            if(!this.isDoubleTask){
              this.choiceTypeGamer('single')
              return
            }
            this.isChoiceTypeGamer = true
            this.isLoad = true
          } else {
            for (let i = 0; i < this.countTeam; i++){
              this.teams.push(i)
            }
            this.isLoad = true
            if (Number.isInteger(this.teamCode)){
              this.choiceTeam(this.teamCode??0)
              return;
            }
            this.isChoiceTeam = true
          }
        },
        error: err => {
          console.log(err)
          this.isLoad = true
          this.errorMessageGamer =err.error.message
        }
      })
    } else this.errorMessageGamer = 'не введен код игры'
  }

  choiceTypeGamer(type: string) {
    this.typeGamer = type
    this.router.navigate(['game',this.gameId, this.teamCode, type])
  }
  choiceTeam(teamNumber: number) {
    this.teamCode = teamNumber
    if(!this.isDoubleTask){
      this.choiceTypeGamer('single')
      return
    }
    this.isChoiceTypeGamer = true
    this.isChoiceTeam = false

  }
}
