import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorInterceptor } from './error-interceptor';
import { SnackbarService } from '../../../shared/services/Snackbar/snackbar-service';
import { API_ERROR_CODES } from '../../constants/error-interceptor.constant';
import { SNACKBAR_DURATION } from '../../../shared/constants/snackbar.constant';

describe('ErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let snackbarService: jasmine.SpyObj<SnackbarService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const snackbarSpy = jasmine.createSpyObj('SnackbarService', [
      'success',
      'error',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: SnackbarService, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    snackbarService = TestBed.inject(
      SnackbarService
    ) as jasmine.SpyObj<SnackbarService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show success snackbar on SUCCESS response (POST)', () => {
    http.post('/api/test', {}).subscribe();

    const req = httpMock.expectOne('/api/test');
    req.flush({
      code: API_ERROR_CODES.SUCCESS,
      message: 'Operation Successful',
    });

    expect(snackbarService.success).toHaveBeenCalledWith(
      'Operation Successful',
      SNACKBAR_DURATION.SHORT
    );
  });

  it('should show success snackbar on CREATED response (POST)', () => {
    http.post('/api/test', {}).subscribe();

    const req = httpMock.expectOne('/api/test');
    req.flush({ code: API_ERROR_CODES.CREATED, message: 'Resource created' });

    expect(snackbarService.success).toHaveBeenCalledWith(
      'Resource created',
      SNACKBAR_DURATION.SHORT
    );
  });

  it('should NOT show success snackbar on GET request', () => {
    http.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    req.flush({
      code: API_ERROR_CODES.SUCCESS,
      message: 'Operation Successful',
    });

    expect(snackbarService.success).not.toHaveBeenCalled();
  });

  it('should handle UNAUTHORIZED error and redirect to login', () => {
    http
      .get('/api/test')
      .subscribe({ next: () => fail('should not succeed'), error: () => {} });

    const req = httpMock.expectOne('/api/test');
    req.flush(
      { code: API_ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
      { status: API_ERROR_CODES.UNAUTHORIZED, statusText: 'Unauthorized' }
    );

    expect(snackbarService.error).toHaveBeenCalledWith(
      'Session expired. Please log in again.',
      SNACKBAR_DURATION.LONG
    );
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show BAD_REQUEST error', () => {
    http
      .get('/api/test')
      .subscribe({ next: () => fail('should not succeed'), error: () => {} });

    const req = httpMock.expectOne('/api/test');
    req.flush(
      { message: 'Invalid Request' },
      { status: API_ERROR_CODES.BAD_REQUEST, statusText: 'Bad Request' }
    );

    expect(snackbarService.error).toHaveBeenCalledWith(
      'Invalid Request',
      SNACKBAR_DURATION.MEDIUM
    );
  });

  it('should show FORBIDDEN error', () => {
    http
      .get('/api/test')
      .subscribe({ next: () => fail('should not succeed'), error: () => {} });

    const req = httpMock.expectOne('/api/test');
    req.flush(
      {},
      { status: API_ERROR_CODES.FORBIDDEN, statusText: 'Forbidden' }
    );

    expect(snackbarService.error).toHaveBeenCalledWith(
      'You do not have permission to perform this action.',
      SNACKBAR_DURATION.LONG
    );
  });

  it('should show NOT_FOUND error', () => {
    http
      .get('/api/test')
      .subscribe({ next: () => fail('should not succeed'), error: () => {} });

    const req = httpMock.expectOne('/api/test');
    req.flush(
      {},
      { status: API_ERROR_CODES.NOT_FOUND, statusText: 'Not Found' }
    );

    expect(snackbarService.error).toHaveBeenCalledWith(
      'Requested resource not found.',
      SNACKBAR_DURATION.MEDIUM
    );
  });

  it('should show INTERNAL_SERVER_ERROR', () => {
    http
      .get('/api/test')
      .subscribe({ next: () => fail('should not succeed'), error: () => {} });

    const req = httpMock.expectOne('/api/test');
    req.flush(
      {},
      {
        status: API_ERROR_CODES.INTERNAL_SERVER_ERROR,
        statusText: 'Server Error',
      }
    );

    expect(snackbarService.error).toHaveBeenCalledWith(
      'Internal server error. Please try again later.',
      SNACKBAR_DURATION.MEDIUM
    );
  });

  it('should handle unknown errors gracefully', () => {
    http
      .get('/api/test')
      .subscribe({ next: () => fail('should not succeed'), error: () => {} });

    const req = httpMock.expectOne('/api/test');
    req.flush({}, { status: 999, statusText: 'Unknown Error' });

    expect(snackbarService.error).toHaveBeenCalled();
  });
});
