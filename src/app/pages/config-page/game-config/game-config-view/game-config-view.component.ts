import {Component, Input} from '@angular/core';
import {IGame} from "../../../../domains/game/game.interface";

@Component({
  selector: 'app-game-config-view',
  templateUrl: './game-config-view.component.html',
  styleUrls: ['./game-config-view.component.css']
})
export class GameConfigViewComponent {
  @Input() game: IGame | undefined
}
