import { TestBed } from '@angular/core/testing';

import { CheckInCheckOutFormService } from './check-in-check-out-form-service';

describe('CheckInCheckOutFormService', () => {
  let service: CheckInCheckOutFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInCheckOutFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
