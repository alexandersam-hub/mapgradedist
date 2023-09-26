import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGame} from "../../../domains/game/game.interface";

@Component({
  selector: 'app-game-card-archive',
  templateUrl: './game-card-archive.component.html',
  styleUrls: ['./game-card-archive.component.css']
})
export class GameCardArchiveComponent implements OnInit{
  @Input() game: IGame | undefined
  @Output() viewStatisticEmit = new EventEmitter<IGame>()
  @Output() toArchiveEmit = new EventEmitter<IGame>()
  isViewStatisticButton: boolean = false

  ngOnInit() {
    if (this.game){
      this.isViewStatisticButton = !!this.game.templateGame.find(t=>t.type==='grade')
    }
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
}
