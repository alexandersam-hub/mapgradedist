import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {config} from "../../../config";
import {IStatistic} from "../../domains/statistic/statistic.interface";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient, private router: Router) { }

  getStatisticByGameId(gameId: string){
    return this.http.get<IStatistic>(config.urlStatistic+gameId)
  }

  getAll(){
    return this.http.get<IStatistic[]>(config.urlStatistic)
  }

  downloadExcel(gameId: string) {
    this.http.get(config.urlLoadExcelStatistic + gameId).subscribe({next: value => {
        console.log(value)
      }, error: err => {
        console.log(err)}})
  }
}
