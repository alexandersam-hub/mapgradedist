import {Component, OnInit} from '@angular/core';
import {ITypeGame} from "../../../domains/type-game/type-game.interface";
import {TypeGameService} from "../../../services/type-game-service/type-game.service";

@Component({
  selector: 'app-type-game',
  templateUrl: './type-game.component.html',
  styleUrls: ['./type-game.component.css']
})
export class TypeGameComponent implements OnInit {
  isLoad: boolean = false
  types: ITypeGame[] = []
  errorMessage: string = ''

  constructor(private typeGameService: TypeGameService) {
  }

  ngOnInit(): void {
    if ( this.typeGameService.typesGames ){
      this.types = this.typeGameService.typesGames
      this.isLoad = true
    } else
    this.typeGameService.getTypeGame().subscribe({
      next: value => {
        this.types = value
        this.isLoad = true
        this.typeGameService.typesGames = value
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.message
      }
    })
  }

  addEmptyTypeGame() {
    const emptyTypeGame = this.typeGameService.getEmptyTypeGame()
    if (this.types.find(t => t.id === 'new')) {
      return
    }
    this.types.push(emptyTypeGame)
    setTimeout(() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}), 200)
  }

  saveTypeGame(indexTypeGame: number) {
    const savedTypeGame = this.types[indexTypeGame]
    this.isLoad = false
    if (savedTypeGame.id === 'new') {
      this.typeGameService.createTypeGame(savedTypeGame).subscribe({
        next: value => {
          this.types[indexTypeGame] = value
          this.isLoad = true
        },
        error: err => {
          console.log(err)
          const e = "Internal server error"
          if ( err.error.message === e) {
            this.errorMessage = 'тип с таким названием уже существует'
          } else
            this.errorMessage = err.error.message
          this.isLoad = true
        }
      })
    } else {
      this.typeGameService.updateTypeGame(savedTypeGame).subscribe({
        next: value => {
          this.types[indexTypeGame] = value
          this.isLoad = true
        },
        error: err => {
          console.log(err)
          this.errorMessage = err.error.message
          this.isLoad = true
        }
      })
    }
  }

  deleteTypeGame(indexTypeGame: number) {
    const deletedTypeGame = this.types[indexTypeGame]
    if (deletedTypeGame.id === 'new') {
      this.types = this.types.filter(t => t.id !== deletedTypeGame.id)
    } else {
      this.typeGameService.deleteTypeGame(deletedTypeGame.id).subscribe({
        next: value => {
          this.types = this.types.filter(t => t.id !== deletedTypeGame.id)
          this.typeGameService.typesGames = this.types
          this.isLoad = true
        },
        error: err => {
          console.log(err)
          this.errorMessage = err.error.message
          this.isLoad = true
        }
      })
    }
  }
}

