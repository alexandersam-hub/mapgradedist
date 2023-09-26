import {Component, OnInit} from '@angular/core';
import {GradeConfigService} from "../services/grade/grade-config.service";
import {IGrade} from "../../../domains/grade/grade.interface";
@Component({
  selector: 'app-grade-config',
  templateUrl: './grade-config.component.html',
  styleUrls: ['./grade-config.component.css']
})
export class GradeConfigComponent implements OnInit{

  grades: IGrade[] = []
  isLoad: boolean = false
  isViewInformer: boolean = false
  message: string = ''
  deletedGrade: IGrade| null = null;
  isViewConfirmWindow: boolean = false;
  constructor(private gradeService: GradeConfigService) {
  }

  ngOnInit(): void {
    this.loadGrades()
  }
  loadGrades() {
    if (this.gradeService.Grades) {
      this.grades = this.gradeService.Grades
      this.isLoad = true
    } else {
      this.gradeService.getGrades().subscribe({
        next: value => {
          this.grades = value
          this.gradeService.Grades = this.grades
          this.isLoad = true
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  saveGrade(grade: IGrade){
    if (grade.id === 'new') {
      this.gradeService.create(grade).subscribe({
        next: value => {
          if (this.grades){
            this.grades.forEach((g,i)=>{
              if (g.id === 'new'){
                this.grades[i] = value
              }
            })
          }
          this.isViewInformer = true
          this.message = 'сохранено'
          setTimeout(()=>{this.isViewInformer = false; this.message = ''}, 1200)
        },
        error: err => {
          console.log(err)
        }
      })
    } else {
      this.gradeService.update(grade).subscribe({
        next: value => {
          if (this.grades){
              this.grades.forEach((g,i)=>{
                if (g.id === value.id){
                  this.grades[i] = value
                }
              })
          }
          this.isViewInformer = true
          this.message = 'сохранено'
          setTimeout(()=>{this.isViewInformer = false; this.message = ''}, 1200)
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  requestDeleteGrade(grade: IGrade){
    this.deletedGrade = grade
    this.isViewConfirmWindow = true
  }
  deleteGrade(){
    if (!this.deletedGrade) {
      return
    }
    if( this.deletedGrade.id === 'new'){
     this.grades = this.grades. filter(g=>g.id !== 'new')
    }
    else{
      this.gradeService.delete(this.deletedGrade.id).subscribe({
        next: value => {
          if (this.grades){
            this.grades = this.grades.filter(g=>g.id !== value.id)
            this.gradeService.Grades = this.grades
            }
          },
        error: err=>{
          console.log(err)
        }
      })
    }
    this.deletedGrade = null
    this.isViewConfirmWindow = false
  }

  addEmptyGrade() {
    if (this.grades && !this.grades.find(g=>g.id === 'new')){
      this.grades.push(this.gradeService.getEmptyGrade())
      setTimeout(()=>  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 200)
    }
  }

  cancelModalInformer() {
    this.isViewInformer = false
  }

  cancelModalWindow() {
    this.isViewConfirmWindow = false
    this.deletedGrade = null
  }
}
