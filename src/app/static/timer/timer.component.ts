import {Component, Input, OnChanges, OnInit} from '@angular/core';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges{
  @Input() time: number = -1

  minutes = 0
  seconds: number = 0
  ngOnInit(): void {
    this.minutes = Math.floor(this.time / 60)
    this.seconds = this.time - this.minutes * 60
  }

  ngOnChanges(): void {
    this.minutes = Math.floor(this.time / 60)
    this.seconds = this.time - this.minutes * 60
  }

}
