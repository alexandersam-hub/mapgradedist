import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {imageTaskUrl} from "../../../../../config";

@Component({
  selector: 'app-start-task',
  templateUrl: './start-task.component.html',
  styleUrls: ['./start-task.component.css']
})
export class StartTaskComponent implements OnChanges{
  @Input() startText: string = ''
  @Input() img: string = ''
  imgUrl = imageTaskUrl
  ngOnChanges(): void {
    window.scrollBy(0, 0)
  }
}
