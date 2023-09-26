import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IGradeResult} from "../../../../domains/game-progress/grader-result.interface";
import {IGrade} from "../../../../domains/grade/grade.interface";

@Component({
  selector: 'app-grade-char',
  templateUrl: './grade-char.component.html',
  styleUrls: ['./grade-char.component.css']
})
export class GradeCharComponent implements OnChanges{
  @Input() grades: IGradeResult[] = []
  colors: string[] = ["darkred", "darkgreen", "darkblue", "red", 'green']
  lineChartLabels: string[] =[]
  lineChartData: any[] = []

  ngOnChanges(): void {
    this.lineChartLabels = []
    this.lineChartData = []
      console.log('grades', this.grades)
    if (this.grades.length >0 && this.grades[0].grade){
      for(let criteria of  this.grades[0].grade.criteria)
        this.lineChartLabels.push(criteria.text)
    }
    for (let grade of this.grades) {
      const answers: number[] = new Array( grade.statistics.length)
      for (let i = 0; i < grade.statistics.length; i++){
        for (let j = 0; j < grade.statistics[i].answer.length; j++){
          if (!Number.isInteger(answers[j])){
            answers[j] = 0
          }
          answers[j] += grade.statistics[i].answer[j]
        }
      }
      for (let i = 0; i < answers.length; i++){
        answers[i] = answers[i] / grade.statistics.length
      }
      this.lineChartData.push({data: answers,label: `${grade.position+1} этап`, backgroundColor:[this.colors[grade.position]] })
    }

  }

  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  _backgroundColors:string[] = ["#345657", "#112288", "#adf444"];



}
