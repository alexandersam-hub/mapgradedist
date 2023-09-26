import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./pages/auth-page/auth.component";
import {AdminGameComponent} from "./pages/admin-game/admin-game.component";
import {GameAdminPageComponent} from "./pages/admin-game/game-admin-page/game-admin-page.component";
import {UserGameComponent} from "./pages/user-game/user-game.component";
import {LoginQrComponent} from "./pages/auth-page/login-qr/login-qr.component";
import {LoginQrAdminComponent} from "./pages/auth-page/login-qr-admin/login-qr-admin.component";
import {GradeViewPageComponent} from "./pages/grade-view-page/grade-view-page.component";

const routes: Routes = [
  {path:"", component: UserGameComponent},
  {path:"authorization/:game", component: AuthComponent},
  {path:"authorization/:game/:team", component: AuthComponent},
  {path:"login/:login/:password", component: LoginQrAdminComponent},
  {path:"admin/:id", component: GameAdminPageComponent},
  {path:"admin", component: AdminGameComponent},
  {path:"statistic", component: GradeViewPageComponent},
  {path:"game/:game/:team/:type", component: LoginQrComponent},
  {path:"config", loadChildren:() => import("./pages/config-page/config-page.module").then(m=>m.ConfigPageModule)},
  {path:'**', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
