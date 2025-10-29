import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePageConfirmationDialogComponent } from './leave-page-confirmation-dialog-component';

describe('LeavePageConfirmationDialogComponent', () => {
  let component: LeavePageConfirmationDialogComponent;
  let fixture: ComponentFixture<LeavePageConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavePageConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavePageConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
