import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ChangepasswordApiService } from './change-password-api-service';
import { ChangePasswordRequest } from '../../model/changePassword.model';
import { baseUserApi } from '../../../../../../environment';

describe('ChangepasswordApiService', () => {
  let service: ChangepasswordApiService;
  let httpMock: HttpTestingController;

  const mockPayload: ChangePasswordRequest = {
    oldPassword: 'oldPass',
    newPassword: 'newPass',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangepasswordApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ChangepasswordApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call POST /Login/ChangePassword and return response', () => {
    const mockResponse = { result: 0, message: 'Success' };

    service.changePassword(mockPayload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUserApi}/Login/ChangePassword`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPayload);

    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const mockError = { status: 400, statusText: 'Bad Request' };

    service.changePassword(mockPayload).subscribe({
      next: () => fail('Should have failed with 400 error'),
      error: (error) => {
        expect(error.status).toBe(400);
      },
    });

    const req = httpMock.expectOne(`${baseUserApi}/Login/ChangePassword`);
    req.flush(null, mockError);
  });
});
