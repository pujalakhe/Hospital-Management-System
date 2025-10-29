import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../../../shared/services/Snackbar/snackbar-service';
import {
  API_ERROR_CODES,
  API_ERROR_MESSAGES,
  API_SUCCESS_MESSAGE,
} from '../../constants/error-interceptor.constant';
import { SNACKBAR_DURATION } from '../../../shared/constants/snackbar.constant';

const { SHORT } = SNACKBAR_DURATION;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackbar: SnackbarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => this.handleSuccess(event, req.method)),
      catchError((error) => this.handleError(error))
    );
  }

  private handleSuccess(event: HttpEvent<any>, method: string): HttpEvent<any> {
    if (event instanceof HttpResponse && method !== 'GET') {
      const { code, message } = event.body || {};
      const config = API_SUCCESS_MESSAGE[
        code as keyof typeof API_SUCCESS_MESSAGE
      ] || {
        message: message || 'Operation successful',
        duration: SHORT,
      };
      if ([API_ERROR_CODES.SUCCESS, API_ERROR_CODES.CREATED].includes(code)) {
        this.snackbar.success(config.message, config.duration);
      }
    }
    return event;
  }

  private handleError(error: HttpErrorResponse) {
    const { status, error: errBody } = error;
    const { code, message } = errBody || {};

    if (
      code === API_ERROR_CODES.UNAUTHORIZED ||
      status === API_ERROR_CODES.UNAUTHORIZED
    ) {
      const config = API_ERROR_MESSAGES.UNAUTHORIZED;
      this.snackbar.error(config.message, config.duration);
      this.router.navigate(['/login']);
      return throwError(() => error);
    }

    const errorMap: Record<number, { message: string; duration: number }> = {
      [API_ERROR_CODES.BAD_REQUEST]: API_ERROR_MESSAGES.BAD_REQUEST,
      [API_ERROR_CODES.FORBIDDEN]: API_ERROR_MESSAGES.FORBIDDEN,
      [API_ERROR_CODES.NOT_FOUND]: API_ERROR_MESSAGES.NOT_FOUND,
      [API_ERROR_CODES.INTERNAL_SERVER_ERROR]:
        API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };

    const config = errorMap[status] || {
      message: message || API_ERROR_MESSAGES.DEFAULT.message,
      duration: API_ERROR_MESSAGES.DEFAULT.duration,
    };

    this.snackbar.error(config.message, config.duration);
    return throwError(() => error);
  }
}
