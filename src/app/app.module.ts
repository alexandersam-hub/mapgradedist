import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app.component";
import {SupportModule} from "./static/support.module";
import {HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './pages/auth-page/auth.component';
import {FormsModule} from "@angular/forms";
import { AdminGameComponent } from './pages/admin-game/admin-game.component';
import { UserGameComponent } from './pages/user-game/user-game.component';
import { GameCardComponent } from './pages/admin-game/game-card/game-card.component';
import { GameAdminPageComponent } from './pages/admin-game/game-admin-page/game-admin-page.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {urlSocket} from "../config";
import { TeamMapViewComponent } from './pages/admin-game/game-admin-page/team-map-view/team-map-view.component';
import { StartTaskComponent } from './pages/user-game/task-view-type/start-task/start-task.component';
import { TaskComponent } from './pages/user-game/task-view-type/task/task.component';
import { GradeComponent } from './pages/user-game/task-view-type/grade/grade.component';
import { ModalInfoComponent } from './pages/user-game/task-view-type/modal-info/modal-info.component';
import { GradeGameComponent } from './pages/admin-game/grades-visual/grade-game/grade-game.component';
import {NgChartsModule} from "ng2-charts";
import {QrcodeSvgModule} from '@larscom/ng-qrcode-svg'
import { QrCodeModule } from 'ng-qrcode';
import { GenerateQrComponent } from './pages/admin-game/generate-qr/generate-qr.component';
import { GradeCharComponent } from './pages/admin-game/grades-visual/grade-char/grade-char.component';
import { StatisticComponent } from './pages/admin-game/statistic-component/statistic.component';
import { LoginQrComponent } from './pages/auth-page/login-qr/login-qr.component';
import { LoginQrAdminComponent } from './pages/auth-page/login-qr-admin/login-qr-admin.component';
import { GameCardArchiveComponent } from './pages/admin-game/game-card-archive/game-card-archive.component';
import { GradeViewPageComponent } from './pages/grade-view-page/grade-view-page.component';
import { GameTableStatisticComponent } from './pages/grade-view-page/game-table-statistic/game-table-statistic.component';

const configSocket: SocketIoConfig = { url: urlSocket, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminGameComponent,
    UserGameComponent,
    GameCardComponent,
    GameAdminPageComponent,
    TeamMapViewComponent,
    StartTaskComponent,
    TaskComponent,
    GradeComponent,
    ModalInfoComponent,
    GradeGameComponent,
    GenerateQrComponent,
    GradeCharComponent,
    StatisticComponent,
    LoginQrComponent,
    LoginQrAdminComponent,
    GameCardArchiveComponent,
    GradeViewPageComponent,
    GameTableStatisticComponent,
  ],
  imports: [
    QrCodeModule,
    QrcodeSvgModule,

    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    SupportModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(configSocket),
  ],
  exports: [HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
