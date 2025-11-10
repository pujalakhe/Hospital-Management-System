import { TestBed } from '@angular/core/testing';

import { AttendanceListApiService } from './attendance-list-api-service';

describe('AttendanceListApiService', () => {
  let service: AttendanceListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
