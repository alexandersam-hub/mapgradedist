import {Component, Input, OnInit} from '@angular/core';
import {IGame} from "../../../domains/game/game.interface";
import {IStatistic} from "../../../domains/statistic/statistic.interface";

@Component({
  selector: 'app-game-table-statistic',
  templateUrl: './game-table-statistic.component.html',
  styleUrls: ['./game-table-statistic.component.css']
})
export class GameTableStatisticComponent implements OnInit{
  @Input() games: IGame[] = []
  @Input() statistics: IStatistic[] = []

  ngOnInit(): void {
  }
}
