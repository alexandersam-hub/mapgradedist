import {Component, Input, OnChanges} from '@angular/core';
import {imageTaskUrl} from "../../../../../config";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnChanges{
  @Input() title: string = ''
  @Input() description: string = ''
  @Input() img: string = ''
  imgUrl: string = imageTaskUrl
  ngOnChanges(): void {
    window.scrollBy(0, 0)
  }

}
