import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FilterOptionsService } from './filter-options-service';
import { FilterOption } from '../model/filter.model';

describe('FilterOptionsService', () => {
  let service: FilterOptionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilterOptionsService],
    });

    service = TestBed.inject(FilterOptionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no pending requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and map filter options correctly', () => {
    const mockEndpoint = 'http://localhost:3000/users';
    const mockField = 'role';
    const mockResponse = [
      { value: 'admin', label: 'Administrator' },
      { value: 'staff', label: 'Staff' },
    ];

    const expectedOptions: FilterOption[] = [
      { value: 'admin', label: 'Administrator' },
      { value: 'staff', label: 'Staff' },
    ];

    service.getFilterOptions(mockEndpoint, mockField).subscribe((options) => {
      expect(options).toEqual(expectedOptions);
    });

    const req = httpMock.expectOne(`${mockEndpoint}/filter-options/${mockField}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle non-object responses gracefully', () => {
    const mockEndpoint = 'http://localhost:3000/users';
    const mockField = 'status';
    const mockResponse = ['active', 'inactive'];

    const expectedOptions: FilterOption[] = [
      { value: 'active', label: 'active' },
      { value: 'inactive', label: 'inactive' },
    ];

    service.getFilterOptions(mockEndpoint, mockField).subscribe((options) => {
      expect(options).toEqual(expectedOptions);
    });

    const req = httpMock.expectOne(`${mockEndpoint}/filter-options/${mockField}`);
    req.flush(mockResponse);
  });

  it('should return an empty array on error', () => {
    const mockEndpoint = 'http://localhost:3000/users';
    const mockField = 'department';

    service.getFilterOptions(mockEndpoint, mockField).subscribe((options) => {
      expect(options).toEqual([]);
    });

    const req = httpMock.expectOne(`${mockEndpoint}/filter-options/${mockField}`);
    req.error(new ErrorEvent('Network error'));
  });
});
