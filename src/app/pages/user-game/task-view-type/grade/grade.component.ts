import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IGrade} from "../../../../domains/grade/grade.interface";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit,OnChanges{
  @Input() grade: IGrade | undefined
  @Output() chooseGradeEmit = new EventEmitter<number[]>()
  reytings: number[] = [1,2,3,4,5]
  grades: number[]= []
  message: string = ''
  ngOnInit(): void {
    window.scrollBy(0, 0)
    if(this.grade) {
      this.grades = new Array(this.grade.criteria.length).fill(0)
    }
  }
  ngOnChanges(): void {
    window.scrollBy(0, 0)
  }
  onClickGrade() {
    console.log(this.grades)
    if (!this.grades.includes(0)){
      this.chooseGradeEmit.emit(this.grades)
    } else {
      this.message = 'даны не все ответы'
    }
  }

  setReting(i: number, j: number) {
    this.grades[i] = j+1
    if(!this.grades.includes(0)){
      this.message = ''
    }
  }


}
