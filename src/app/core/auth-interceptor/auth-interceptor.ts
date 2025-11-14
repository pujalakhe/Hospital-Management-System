import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AUTH_TOKEN_KEY } from '../constants/storage.constants';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ROUTER_PATHS } from '../constants/router-path.constant';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const router = inject(Router); // Angular v18+

  const modifiedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // console.log(`[Interceptor] ${req.method} → ${req.url}`);

  return next(modifiedReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        // console.log('[Response received]', event.status, event.url);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        router.navigate([ROUTER_PATHS.LOGIN]);
      }

      return throwError(() => error);
    })
  );
};
