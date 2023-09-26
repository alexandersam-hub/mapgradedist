import {Component, Input, OnInit} from '@angular/core';
import {StatisticService} from "../../../services/statistic-service/statistic.service";
import {IStatistic} from "../../../domains/statistic/statistic.interface";
import {IGame} from "../../../domains/game/game.interface";
import {config} from "../../../../config";
@Component({
  selector: 'app-statistic-component',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit{
  @Input() game: IGame | undefined
  statistic: IStatistic|undefined
  isLoad: boolean = false
  urlLoad = config.urlLoadExcelStatistic
  constructor(private statisticService: StatisticService) {
  }

  ngOnInit(): void {
    if (this.game){
      this.statisticService.getStatisticByGameId(this.game.id).subscribe({
        next: value => {
          console.log(value)
          this.statistic = value
          this.isLoad = true
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }


  downloadExcel() {
    this.statisticService.downloadExcel(this.game?.id??'')
  }
}
