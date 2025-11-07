import { TestBed } from '@angular/core/testing';

import { CheckOutApiService } from './check-out-api-service';

describe('CheckOutApiService', () => {
  let service: CheckOutApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOutApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
