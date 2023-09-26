import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IGame} from "../../../../domains/game/game.interface";
import {imageGameUrl} from "../../../../../config";

@Component({
  selector: 'app-preview-game',
  templateUrl: './preview-game.component.html',
  styleUrls: ['./preview-game.component.css']
})
export class PreviewGameComponent {
  @Input() game: IGame | undefined
  @Output() closeEmit = new EventEmitter<void>()
  urlImage = imageGameUrl
  close(){
    this.closeEmit.emit()
  }

  protected readonly imageGameUrl = imageGameUrl;
}
