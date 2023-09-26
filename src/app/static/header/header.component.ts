import {Component, Input} from '@angular/core';
import {imageGameUrl, imageLogoUrl} from "../../../config";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() color: string = ''
  @Input() logo: string = ''
  urlLogo = imageLogoUrl
  protected readonly imageGameUrl = imageGameUrl;
}
