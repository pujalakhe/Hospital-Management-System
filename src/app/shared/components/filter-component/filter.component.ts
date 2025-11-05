import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { FilterColumn, FilterOption } from '../../model/filter.model';
import { MaterialModule } from '../../angular-material.module';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class FilterComponent implements OnInit {
  filterForm = new FormGroup({});
  filteredOptions: Record<string, Observable<FilterOption[]>> = {};
  fieldOptions: Record<string, FilterOption[]> = {};
  filterableColumns: FilterColumn[] = [];

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      filterableColumns: FilterColumn[];
      currentFilters?: Record<string, any>;
    }
  ) {}

  ngOnInit() {
    this.filterableColumns = this.data.filterableColumns ?? [];

    this.filterableColumns.forEach((column) => {
      const control = new FormControl(null);
      this.filterForm.addControl(column.field, control);
      this.fieldOptions[column.field] = this.getFieldOptions(column);
      this.filteredOptions[column.field] = control.valueChanges.pipe(
        startWith(''),
        map((value) =>
          this.filterOptions((value ?? '').toString(), column.field)
        )
      );
    });

    if (this.data.currentFilters) {
      this.filterForm.patchValue(this.data.currentFilters);
    }
  }

  private getFieldOptions(column: FilterColumn): FilterOption[] {
    return column.options?.length ? column.options : column.endpoint ? [] : [];
  }

  private filterOptions(value: string, fieldName: string): FilterOption[] {
    const filterValue = value.toLowerCase();
    const options = this.fieldOptions[fieldName] ?? [];
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(filterValue) ||
        option.value.toString().toLowerCase().includes(filterValue)
    );
  }

  close() {
    this.dialogRef.close(null);
  }

  applyFilter() {
    const filters = Object.entries(this.filterForm.value).reduce(
      (acc, [key, value]) => {
        if (!value) return acc;
        const val = typeof value === 'string' ? value.trim() : value;
        if (val) acc[key] = val;
        return acc;
      },
      {} as Record<string, any>
    );
    this.dialogRef.close(filters);
  }

  resetFilters() {
    this.filterForm.reset();
    this.dialogRef.close({});
  }

  displayWith(value: any): string {
    return value?.toString?.() ?? '';
  }
}
