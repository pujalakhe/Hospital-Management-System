import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { baseUserApi } from '../../../../../../../environment';
import { LoginRequest, LoginResponse } from '../../../login/model/login.model';
import { LoginApiService } from './login-api-service';

describe('LoginApiService', () => {
  let service: LoginApiService;
  let httpMock: HttpTestingController;

  const mockLoginResponse: LoginResponse = {
    result: 2,
    message: 'Login successful',
    data: {
      token: 'mock-token',
      employeeId: 123,
      role: 'Admin',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginApiService],
    });

    service = TestBed.inject(LoginApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login API and return the correct LoginResponse', () => {
    const payload: LoginRequest = {
      email: 'test@test.com',
      password: '123456',
    };

    service.login(payload).subscribe((res) => {
      expect(res).toEqual(mockLoginResponse);
      expect(res.data.token).toBe('mock-token');
      expect(res.data.employeeId).toBe(123);
      expect(res.data.role).toBe('Admin');
    });

    const req = httpMock.expectOne(`${baseUserApi}/Login/Login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(mockLoginResponse); // Mock the API response
  });
});
