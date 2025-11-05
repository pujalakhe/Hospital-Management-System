import { TestBed } from '@angular/core/testing';

import { ChangePasswordFormService } from './change-password-form-service';

describe('ChangePasswordFormService', () => {
  let service: ChangePasswordFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
