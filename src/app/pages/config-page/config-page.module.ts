import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ConfigPageComponent} from "./config-page.component";
import {UserConfigComponent} from './user-config/user-config.component';
import {TaskConfigComponent} from './task-config/task-config.component';
import {HttpClientModule} from '@angular/common/http';
import {UserCardConfigComponent} from './user-config/user-card-config/user-card-config.component';
import {FormsModule} from "@angular/forms";
import {SupportModule} from "../../static/support.module";
import {TaskCardConfigComponent} from './task-config/task-card-config/task-card-config.component';
import {GameConfigComponent} from './game-config/game-config.component';
import {GradeConfigComponent} from './grade-config/grade-config.component';
import {GameConfigCardComponent} from './game-config/game-config-card/game-config-card.component';
import {GradeConfigCardComponent} from './grade-config/grade-config-card/grade-config-card.component';
import {GameConfigViewComponent} from './game-config/game-config-view/game-config-view.component';
import {QrCodeModule} from "ng-qrcode";
import { TypeGameComponent } from './type-game/type-game.component';
import { TypeGameCardComponent } from './type-game/type-game-card/type-game-card.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PreviewGameComponent } from './game-config/preview-game/preview-game.component';

@NgModule({
  declarations: [ConfigPageComponent, UserConfigComponent,
                TaskConfigComponent, UserCardConfigComponent,
                TaskCardConfigComponent, GameConfigComponent,
                GradeConfigComponent, GameConfigCardComponent,
                GradeConfigCardComponent, GameConfigViewComponent, TypeGameComponent, TypeGameCardComponent, PreviewGameComponent],
  imports: [
    ColorPickerModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', children: [
          {path: '', component: ConfigPageComponent},
          {path: 'user', component: UserConfigComponent},
          {path: 'task', component: TaskConfigComponent},
        ]
      },
    ]),
    FormsModule,
    SupportModule,
    QrCodeModule,
    NgOptimizedImage
  ]
})
export class ConfigPageModule {
}
