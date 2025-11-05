import { TestBed } from '@angular/core/testing';

import { ChangepasswordApiService } from './change-password-api-service';

describe('ChangePasswordApi', () => {
  let service: ChangepasswordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangepasswordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
