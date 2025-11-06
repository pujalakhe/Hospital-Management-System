import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Injector, runInInjectionContext } from '@angular/core';

import { apiNotificationInterceptor } from './api-notification-interceptor';
import { SnackbarService } from '../../shared/services/snackbar-service/snackbar-service';
import { ResultType } from '../enum/result-type.enum';
import { ApiResponse } from '../../shared/model/api-response';
import { TestBed } from '@angular/core/testing';

describe('apiNotificationInterceptor', () => {
  let snackbarService: SnackbarService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackbarService],
    });

    snackbarService = TestBed.inject(SnackbarService);

    spyOn(snackbarService, 'success').and.callFake(() => {});
    spyOn(snackbarService, 'error').and.callFake(() => {});
    spyOn(snackbarService, 'info').and.callFake(() => {});

    injector = TestBed.inject(Injector);
  });

  const createHttpResponse = (result: ResultType, message = 'Test message') =>
    new HttpResponse<ApiResponse<any>>({
      body: { result, message },
    });

  function runInterceptor(req: any, next: any) {
    return runInInjectionContext(injector, () =>
      apiNotificationInterceptor(req, next)
    );
  }

  it('should call snackbarService.success for ResultType.Success', (done) => {
    const req: any = {};
    const next: any = (request: any) =>
      of(createHttpResponse(ResultType.Success));

    runInterceptor(req, next).subscribe(() => {
      expect(snackbarService.success).toHaveBeenCalledWith('Test message');
      expect(snackbarService.error).not.toHaveBeenCalled();
      expect(snackbarService.info).not.toHaveBeenCalled();
      done();
    });
  });

  it('should call snackbarService.error for ResultType.Failure', (done) => {
    const req: any = {};
    const next: any = (request: any) =>
      of(createHttpResponse(ResultType.Failure));

    runInterceptor(req, next).subscribe(() => {
      expect(snackbarService.error).toHaveBeenCalledWith('Test message');
      expect(snackbarService.success).not.toHaveBeenCalled();
      expect(snackbarService.info).not.toHaveBeenCalled();
      done();
    });
  });

  it('should call snackbarService.info for unknown ResultType', (done) => {
    const req: any = {};
    const next: any = (request: any) =>
      of(createHttpResponse('Unknown' as any, 'Info message'));

    runInterceptor(req, next).subscribe(() => {
      expect(snackbarService.info).toHaveBeenCalledWith('Info message');
      expect(snackbarService.success).not.toHaveBeenCalled();
      expect(snackbarService.error).not.toHaveBeenCalled();
      done();
    });
  });

  it('should not call snackbarService if response body is undefined', (done) => {
    const req: any = {};
    const next: any = (request: any) =>
      of(new HttpResponse({ body: undefined }));

    runInterceptor(req, next).subscribe(() => {
      expect(snackbarService.success).not.toHaveBeenCalled();
      expect(snackbarService.error).not.toHaveBeenCalled();
      expect(snackbarService.info).not.toHaveBeenCalled();
      done();
    });
  });

  it('should not call snackbarService for non-HttpResponse events', (done) => {
    const req: any = {};
    const next: any = (request: any) => of({}); // Not an HttpResponse

    runInterceptor(req, next).subscribe(() => {
      expect(snackbarService.success).not.toHaveBeenCalled();
      expect(snackbarService.error).not.toHaveBeenCalled();
      expect(snackbarService.info).not.toHaveBeenCalled();
      done();
    });
  });
});
