import { TestBed } from '@angular/core/testing';

import { AttendanceDetailApiService } from './attendance-detail-api-service';

describe('AttendanceDetailApiService', () => {
  let service: AttendanceDetailApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceDetailApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
