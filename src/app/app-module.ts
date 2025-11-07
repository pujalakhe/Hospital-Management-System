import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/auth-interceptor/auth-interceptor';
import { apiNotificationInterceptor } from './core/api-notification-interceptor/api-notification-interceptor';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,

    AppRoutingModule,
    RouterModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
  ],
  providers: [
    provideStoreDevtools(),
    provideHttpClient(
      withInterceptors([authInterceptor, apiNotificationInterceptor])
    ),
  ],
  bootstrap: [App],
})
export class AppModule {}
