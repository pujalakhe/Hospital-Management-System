import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { of } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BaseTableComponent } from './base-table-component';
import { MaterialModule } from '../../../angular-material.module';
import { selectBaseTableLoading } from '../store/table.selectors';
import { TableColumn } from '../models/table-column.model';

describe('BaseTableComponent', () => {
  let component: BaseTableComponent<any>;
  let fixture: ComponentFixture<BaseTableComponent<any>>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let store: MockStore;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [MaterialModule, MatDialogModule ,NoopAnimationsModule],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectBaseTableLoading, value: of(false) }],
        }),
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTableComponent<any>);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loading$ observable', () => {
    component.ngOnInit();
    expect(component.loading$).toBeTruthy();
  });

  it('should update datasource and displayed columns on changes', () => {
    component.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
    ] as TableColumn<any>[];
    component.rows = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];

    component.ngOnChanges({});

    expect(component.dataSource.data.length).toBe(2);
    expect(component.displayedColumns).toEqual(['id', 'name']);
  });

  it('should emit sortChange when serverSide is true', () => {
    const sortChangeSpy = spyOn(component.sortChange, 'emit');
    component.serverSide = true;

    const mockSort = { active: 'name', direction: 'asc' } as MatSort;
    component.onSortChange(mockSort);

    expect(sortChangeSpy).toHaveBeenCalledWith({ field: 'name', direction: 'asc' });
  });

  it('should not emit sortChange when serverSide is false', () => {
    const sortChangeSpy = spyOn(component.sortChange, 'emit');
    component.serverSide = false;

    const mockSort = { active: 'name', direction: 'asc' } as MatSort;
    component.onSortChange(mockSort);

    expect(sortChangeSpy).not.toHaveBeenCalled();
  });

  it('should emit pageChange when serverSide is true', () => {
    const pageChangeSpy = spyOn(component.pageChange, 'emit');
    component.serverSide = true;

    const event = { pageIndex: 1, pageSize: 10 } as PageEvent;
    component.onPageChange(event);

    expect(pageChangeSpy).toHaveBeenCalledWith({ page: 2, pageSize: 10 });
  });

  it('should not emit pageChange when serverSide is false', () => {
    const pageChangeSpy = spyOn(component.pageChange, 'emit');
    component.serverSide = false;

    const event = { pageIndex: 1, pageSize: 10 } as PageEvent;
    component.onPageChange(event);

    expect(pageChangeSpy).not.toHaveBeenCalled();
  });

  it('should return template if found', () => {
    const mockTemplate = {} as TemplateRef<any>;
    component.customCellTemplates = { name: mockTemplate };
    expect(component.getTemplate('name')).toBe(mockTemplate);
  });

  it('should return cell value', () => {
    const row = { id: 1, name: 'Test' };
    expect(component.getCellValue(row, 'name')).toBe('Test');
  });

  it('should emit filterChange when serverSide is true on applyFilters()', () => {
    component.serverSide = true;
    component.currentFilters = { name: 'John' };
    const spyFilterChange = spyOn(component.filterChange, 'emit');
    component.applyFilters();
    expect(spyFilterChange).toHaveBeenCalledWith({ name: 'John' });
  });

  it('should apply client-side filters when serverSide is false', () => {
    component.serverSide = false;
    component.currentFilters = { name: 'John' };
    component.applyFilters();
    expect(component.dataSource.filter).toBe(JSON.stringify(component.currentFilters));
  });

  it('should clear filters correctly', () => {
    const spyApplyFilters = spyOn(component, 'applyFilters');
    component.currentFilters = { name: 'John' };
    component.clearFilters();
    expect(component.currentFilters).toEqual({});
    expect(spyApplyFilters).toHaveBeenCalled();
  });

  it('should detect active filters correctly', () => {
    component.currentFilters = { status: 'active' };
    expect(component.hasActiveFilters()).toBeTrue();

    component.currentFilters = {};
    expect(component.hasActiveFilters()).toBeFalse();
  });
});
