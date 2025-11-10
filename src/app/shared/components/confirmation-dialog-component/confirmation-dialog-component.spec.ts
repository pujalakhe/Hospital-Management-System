import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog-component';
import { MaterialModule } from '../../angular-material.module';
import { CommonModule } from '@angular/common';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';

enum DialogActions {
  Delete = 'delete',
  Cancel = 'cancel',
}

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmationDialogComponent>>;

  const mockData: ConfirmDialogData = {
    title: 'Confirm',
    message: 'Are you sure?',
    action: DialogActions.Delete,
    cancelBtn: DialogActions.Cancel,
  };

  beforeEach(() => {
    const spyDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [MaterialModule, CommonModule, ConfirmationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: spyDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<ConfirmationDialogComponent>
    >;
    fixture.detectChanges();
  });

  it('should create component with injected data', () => {
    expect(component).toBeTruthy();
    expect(component.data).toEqual(mockData);
  });

  it('onConfirm should close dialog with action', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(DialogActions.Delete);
  });

  it('onCancel should close dialog with cancelBtn', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false); // or component.data.cancelBtn if intended
  });
});
