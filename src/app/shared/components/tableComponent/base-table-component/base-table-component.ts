import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../angular-material.module';
import { DEFAULT_DIALOG_WIDTH, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, EMPTY_FILTER, LOWERCASE, SortDirection, TableColumn } from '../models/table-column.model';
import { FilterComponent } from '../../filter-component/filter.component';


@Component({
  selector: 'app-base-table-component',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './base-table-component.html',
  styleUrls: ['./base-table-component.scss'],
})
export class BaseTableComponent<T = any> implements AfterViewInit, OnChanges {
  @Input() columns: TableColumn<T>[] = [];
  @Input() rows: T[] = [];
  @Input() total = 0;
  @Input() page = DEFAULT_PAGE;
  @Input() pageSize = DEFAULT_PAGE_SIZE;
  @Input() loading = false;
  @Input() customCellTemplates?: Record<string, TemplateRef<any>>;
  @Input() serverSide = false;

  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();
  @Output() pageChange = new EventEmitter<{ page: number; pageSize?: number }>();
  @Output() sortChange = new EventEmitter<{ field: string; direction: SortDirection } | null>();
  @Output() filterChange = new EventEmitter<Record<string, any>>();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();
  currentFilters: Record<string, any> = {};

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ?? undefined;
    this.dataSource.sort = this.sort ?? undefined;
  }

  ngOnChanges(_: SimpleChanges) {
    this.dataSource.data = this.rows ?? [];
    this.displayedColumns = this.columns.map(col => String(col.field));

    this.dataSource.filterPredicate = (data: T, filter: string) => {
      if (!filter) return true;

      try {
        const filters = JSON.parse(filter);
        return Object.entries(filters).every(([field, value]) => {
          if (value == null || value === EMPTY_FILTER) return true;

          const cellValue = data[field as keyof T];
          if (cellValue == null) return false;

          return LOWERCASE(cellValue) === LOWERCASE(value);
        });
      } catch {
        return true;
      }
    };
  }

  onSortChange(sortState: Sort) {
    if (!this.serverSide) return;

    const event = sortState.direction
      ? { field: sortState.active, direction: sortState.direction as 'asc' | 'desc' }
      : null;

    this.sortChange.emit(event);
  }

  onPageChange(event: PageEvent) {
    if (!this.serverSide) return;

    this.pageChange.emit({
      page: event.pageIndex + DEFAULT_PAGE,
      pageSize: event.pageSize,
    });
  }

  getTemplate(field: string): TemplateRef<any> | null {
    return this.customCellTemplates?.[field] ?? null;
  }

  getCellValue(row: T, field: string | keyof T): any {
    return row[field as keyof T];
  }

  get filterableColumns() {
    return this.columns.filter(col => col.filterable);
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: `${DEFAULT_DIALOG_WIDTH}px`,
      data: {
        filterableColumns: this.filterableColumns.map(col => ({
          field: col.field as string,
          header: col.header,
          options: col.filterOptions,
          endpoint: col.filterEndpoint,
        })),
        currentFilters: this.currentFilters,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof result === 'object' && Object.keys(result).length) {
        this.currentFilters = { ...this.currentFilters, ...result };
        this.applyFilters();
        return;
      }

      if (result === null) return; // Cancel — keep state
    });
  }

  applyFilters() {
    if (this.serverSide) {
      this.filterChange.emit(this.currentFilters);
      return;
    }

    this.dataSource.filter = Object.keys(this.currentFilters).length
      ? JSON.stringify(this.currentFilters)
      : EMPTY_FILTER;
  }

  clearFilters() {
    this.currentFilters = {};
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return Object.keys(this.currentFilters).length > 0;
  }
}
