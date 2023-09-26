import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IGrade} from "../../../../domains/grade/grade.interface";
import {config} from "../../../../../config";
import {Observable} from "rxjs";
import {GradeDefault} from "./grade-default";

@Injectable({
  providedIn: 'root'
})
export class GradeConfigService {

  private grades: IGrade[] | undefined
  constructor(private http: HttpClient) { }

  get Grades () {
    return this.grades
  }

  set Grades(grades: IGrade[] | undefined) {
    this.grades = grades
  }

  create(grade: IGrade): Observable<IGrade>{
    return this.http.post<IGrade>(config.urlGrade, grade)
  }

  update(grade: IGrade): Observable<IGrade>{
    return this.http.put<IGrade>(config.urlGrade, grade)
  }

  delete(gradeId: string): Observable<IGrade> {
    return this.http.delete<IGrade>(config.urlGrade+gradeId)
  }

  getGrades (): Observable<IGrade[]>{
    return this.http.get<IGrade[]>(config.urlGrade)
  }

  getEmptyGrade (): IGrade {
    return new GradeDefault()
  }
}
