import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`[Interceptor] ${request.method} → ${request.url}`);

    switch (request.method) {
      case 'GET':
        return this.handleGet(request, next);
      case 'POST':
        return this.handlePost(request, next);
      case 'PUT':
        return this.handlePut(request, next);
      default:
        return next.handle(request);
    }
  }

  private handleGet(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({});

    return next
      .handle(modifiedRequest)
      .pipe(tap((event) => this.logResponse(event)));
  }

  private handlePost(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      //setHeaders: { 'Content-Type': 'application/json' },
    });

    return next
      .handle(modifiedRequest)
      .pipe(tap((event) => this.logResponse(event)));
  }

  private handlePut(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      //setHeaders: { 'Content-Type': 'application/json' },
    });

    return next
      .handle(modifiedRequest)
      .pipe(tap((event) => this.logResponse(event)));
  }

  private logResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      console.log('[Response received]', event.status, event.url);
    }
  }
}
