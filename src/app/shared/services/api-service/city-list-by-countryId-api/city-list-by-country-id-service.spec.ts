import { TestBed } from '@angular/core/testing';

import { CityListByCountryIdService } from './city-list-by-country-id-service';

describe('CityListByCountryIdService', () => {
  let service: CityListByCountryIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityListByCountryIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
