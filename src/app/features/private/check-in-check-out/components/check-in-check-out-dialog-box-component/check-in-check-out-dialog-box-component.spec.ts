import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInCheckOutDialogBoxComponent } from './check-in-check-out-dialog-box-component';

describe('CheckInCheckOutDialogBoxComponent', () => {
  let component: CheckInCheckOutDialogBoxComponent;
  let fixture: ComponentFixture<CheckInCheckOutDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckInCheckOutDialogBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInCheckOutDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
