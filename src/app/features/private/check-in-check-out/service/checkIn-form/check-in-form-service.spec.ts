import { TestBed } from '@angular/core/testing';

import { CheckInFormService } from './check-in-form-service';

describe('CheckInFormService', () => {
  let service: CheckInFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
