import {Component, OnInit} from '@angular/core';
import {IGame} from "../../domains/game/game.interface";
import {GameService} from "../../services/game-service/game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-game-service',
  templateUrl: './admin-game.component.html',
  styleUrls: ['./admin-game.component.css']
})
export class AdminGameComponent implements OnInit{
  games: IGame[] = []
  isLoad: boolean = false
  gameGenerateQr: IGame | null = null
  gameStatisticView: IGame | null = null
  isViewModal: boolean = false;
  message: string = '';
  isArchiveView: boolean = false
  constructor( private router: Router,private gameService: GameService) {
  }
  ngOnInit(): void {
    if (!localStorage.getItem( 'token')){
      this.router.navigate(['/', 'authorization'])
    }
    this.gameService.getGames().subscribe({
      next: value => {
        this.games = value
        this.isLoad = true
      },
      error: err => {
        console.log(err)
        this.isLoad = true
      }
    })
  }
  setGameGenerateQr(game: IGame) {
    this.gameGenerateQr = game
  }

  closeGenerateQr() {
    this.gameGenerateQr = null
  }

  viewStatistic(game: IGame) {
      this.gameStatisticView = game
  }
  closeStatistic(){
    this.gameStatisticView = null
  }

  toArchive(game: IGame) {
    this.isLoad = false
    game.isArchive = !game.isArchive
    console.log('!!!', game)
    this.gameService.toArchive(game).subscribe({
      next: value => {
        const updateGame = this.games.find(g=>g.id === game.id)
        if (updateGame){
          updateGame.isArchive = value.isArchive
          if (value.isArchive)
            this.message = 'игра в архиве'
          else
            this.message = 'игра активна'
          this.isLoad = true
          this.isViewModal = true
        }
      },
      error: err => {
        console.log(err)
        this.isLoad = true
        this.message = 'не удалось сохранить изменения. '+ err.error.message
        this.isViewModal = true
      }
    })
  }
  closeModal() {
    this.isViewModal = false
    this.message = ''
  }
  countActiveGame(): number{
    return this.games.filter(g=>!g.isArchive).length
  }
  countArchiveGame():number{
    return this.games.filter(g=>g.isArchive).length
  }
}
