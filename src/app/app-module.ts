import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { GenericHttpInterceptor } from './core/auth-interceptor/http-interceptor';

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
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GenericHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
