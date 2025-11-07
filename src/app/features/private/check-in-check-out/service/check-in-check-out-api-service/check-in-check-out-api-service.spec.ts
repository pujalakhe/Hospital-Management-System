import { TestBed } from '@angular/core/testing';

import { CheckInCheckOutApiService } from './check-in-check-out-api-service';

describe('CheckInCheckOutApiService', () => {
  let service: CheckInCheckOutApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInCheckOutApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
