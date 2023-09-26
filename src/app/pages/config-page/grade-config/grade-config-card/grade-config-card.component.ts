import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IGrade} from "../../../../domains/grade/grade.interface";
import {ICriteria} from "../../../../domains/grade/criteria.interface";

@Component({
  selector: 'app-grade-config-card',
  templateUrl: './grade-config-card.component.html',
  styleUrls: ['./grade-config-card.component.css']
})
export class GradeConfigCardComponent {
  @Input() grade: IGrade | undefined
  @Output() saveGradeEmitter = new EventEmitter<IGrade>()
  @Output() deleteGradeEmitter = new EventEmitter<IGrade>()
  addCriteria(){
    if(this.grade) {
      const newCriteria: ICriteria = {text:''}
      this.grade.criteria.push(newCriteria)
    }
  }

  deleteCriteria(index: number) {
    if (this.grade){
      this.grade.criteria = this.grade.criteria.filter((c, i)=> i !== index)
    }
  }

  deleteGrade() {
    if(this.grade){
      this.deleteGradeEmitter.emit(this.grade)
    }
  }

  saveGrade() {
    console.log(this.grade)
    if(this.grade){
      this.saveGradeEmitter.emit(this.grade)
    }
  }
}
