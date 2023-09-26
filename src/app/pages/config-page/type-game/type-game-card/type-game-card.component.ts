import {Component, Input} from '@angular/core';
import {ITypeGame} from "../../../../domains/type-game/type-game.interface";

@Component({
  selector: 'app-type-game-card',
  templateUrl: './type-game-card.component.html',
  styleUrls: ['./type-game-card.component.css']
})
export class TypeGameCardComponent {
  @Input() typeGame: ITypeGame | undefined
}
