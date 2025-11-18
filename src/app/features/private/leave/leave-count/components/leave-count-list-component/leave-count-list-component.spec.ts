import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCountListComponent } from './leave-count-list-component';

describe('LeaveCountListComponent', () => {
  let component: LeaveCountListComponent;
  let fixture: ComponentFixture<LeaveCountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveCountListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveCountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
