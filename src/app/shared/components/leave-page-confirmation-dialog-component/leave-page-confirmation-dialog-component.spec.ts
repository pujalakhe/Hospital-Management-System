import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeavePageConfirmationDialogComponent } from './leave-page-confirmation-dialog-component';

describe('LeavePageConfirmationDialogComponent', () => {
  let component: LeavePageConfirmationDialogComponent;
  let fixture: ComponentFixture<LeavePageConfirmationDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<
    MatDialogRef<LeavePageConfirmationDialogComponent>
  >;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [LeavePageConfirmationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { message: 'Test Message' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeavePageConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('confirm() should close dialog with true', () => {
    component.confirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('cancel() should close dialog with false', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});
