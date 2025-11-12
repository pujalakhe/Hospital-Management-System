import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AUTH_TOKEN_KEY } from '../constants/storage.constants';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  const modifiedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // console.log(`[Interceptor] ${req.method} → ${req.url}`);

  return next(modifiedReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        // console.log('[Response received]', event.status, event.url);
      }
    })
  );
};

 