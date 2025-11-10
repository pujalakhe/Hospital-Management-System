import { TestBed } from '@angular/core/testing';
import { SignupApiService } from './signup-api-service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SignupRequest, SignupResponse } from '../../models/signup.model';
import { provideHttpClient } from '@angular/common/http';

describe('SignupApiService', () => {
  let service: SignupApiService;
  let httpMock: HttpTestingController;
  const mockUrl =
    'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/Employee/RegisterEmployee';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignupApiService,
        provideHttpClientTesting(),
        provideHttpClient,
      ],
    });
    service = TestBed.inject(SignupApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request with correct payload and URL', () => {
    const mockPayload: SignupRequest = {
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Strong1!',
      confirmPassword: 'Strong1!',
      mobileNo: '9876543210',
      citizenshipNo: '12345',
      dob: '2000-01-01',
      gender: 1,
      nationality: 'Nepalese',
      startDate: '2025-01-01',
      departmentId: 1,
      role: 1,
      address: {
        name: 'Kathmandu',
        countryId: 1,
        cityId: 2,
      },
    };

    const mockResponse: SignupResponse = {
      result: 2,
      message: 'Signup successful',
      data: true,
    };

    service.signup(mockPayload).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockResponse);
  });

  it('should handle HTTP error response', () => {
    const mockPayload = { firstName: 'Test' } as SignupRequest;

    service.signup(mockPayload).subscribe({
      next: () => fail('should have failed with 400 error'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });
    const req = httpMock.expectOne(mockUrl);
    req.flush('Invalid request', {
      status: 400,
      statusText: 'Bad Request',
    });
  });
});
