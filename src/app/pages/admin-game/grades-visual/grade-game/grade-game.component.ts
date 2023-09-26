import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IGradeResult} from "../../../../domains/game-progress/grader-result.interface";
@Component({
  selector: 'app-grade-game',
  templateUrl: './grade-game.component.html',
  styleUrls: ['./grade-game.component.css'],
})
export class GradeGameComponent implements OnChanges{
  @Input() grade: IGradeResult | null = null
  @Input() isViewTh: boolean = true
  userGrades:any = []
  users: string[] = []

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.userGrades = []
    // this.displayedColumns = ['код']

    if (this.grade) {
      // for (let c of this.grade.grade.criteria){
      //   this.displayedColumns.push(c.text)
      // }
      for (let statistic of this.grade.statistics) {
        if (!this.users.includes(statistic.userCode)){
          this.users.push(statistic.userCode)
        }
        this.userGrades.push({answer: statistic.answer, code: this.users.indexOf(statistic.userCode)+1})
      }
    }
  }

}
