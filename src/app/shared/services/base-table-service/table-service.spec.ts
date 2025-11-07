import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseTableService } from './table-service';
import { BaseTableRequest, BaseTableResponse } from '../models/table-column.model';

describe('BaseTableService', () => {
  let service: BaseTableService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseTableService],
    });

    service = TestBed.inject(BaseTableService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call default endpoint when none provided', () => {
    const mockResponse = [{ id: 1, name: 'John Doe' }];
    const request: BaseTableRequest = { page: 1, pageSize: 10 };

    service.fetch(request).subscribe((response: BaseTableResponse<any>) => {
      expect(response.items).toEqual(mockResponse);
      expect(response.total).toBe(mockResponse.length);
    });

    const req = httpMock.expectOne('http://localhost:3000/users?page=1&pageSize=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call custom endpoint when provided', () => {
    const mockResponse = { total: 50, items: [{ id: 1, name: 'Jane Doe' }] };
    const request: BaseTableRequest = {
      endpoint: 'http://localhost:4000/clients',
      page: 2,
      pageSize: 5,
    };

    service.fetch(request).subscribe((response: BaseTableResponse<any>) => {
      expect(response.total).toBe(50);
      expect(response.items.length).toBe(1);
      expect(response.items[0].name).toBe('Jane Doe');
    });

    const req = httpMock.expectOne('http://localhost:4000/clients?page=2&pageSize=5');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

it('should add sort parameters when provided', () => {
  const mockResponse = [{ id: 1, name: 'Sorted User' }];
  const request: BaseTableRequest = {
    page: 1,
    pageSize: 5,
    sort: { field: 'name', direction: 'asc' },
  };

  service.fetch(request).subscribe((response: BaseTableResponse<any>) => {
    expect(response.items).toEqual(mockResponse);
    expect(response.total).toBe(1);
  });

  const req = httpMock.expectOne('http://localhost:3000/users?page=1&pageSize=5&sort=name%3Aasc');
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
});


  it('should handle empty response gracefully', () => {
    const request: BaseTableRequest = { page: 1, pageSize: 5 };

    service.fetch(request).subscribe((response: BaseTableResponse<any>) => {
      expect(response.items).toEqual([]);
      expect(response.total).toBe(0);
    });

    const req = httpMock.expectOne('http://localhost:3000/users?page=1&pageSize=5');
    req.flush([]);
  });
});
