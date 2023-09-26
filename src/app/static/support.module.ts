import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import { ModalWindowComponent } from './modal-window/modal-window.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { TimerComponent } from './timer/timer.component';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [HeaderComponent, ModalWindowComponent, TimerComponent, LoaderComponent],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [HeaderComponent, ModalWindowComponent, TimerComponent, LoaderComponent],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})
export class SupportModule { }
