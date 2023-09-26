import {Component, Input} from '@angular/core';
import {ITask} from "../../../../domains/task/task.interface";

@Component({
  selector: 'app-team-map-view',
  templateUrl: './team-map-view.component.html',
  styleUrls: ['./team-map-view.component.css']
})
export class TeamMapViewComponent {
  @Input() teamMap: ITask[] = []
}
