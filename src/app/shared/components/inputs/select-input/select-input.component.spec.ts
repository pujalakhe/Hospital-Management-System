import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInput } from './select-input.component';

describe('SelectInput', () => {
  let component: SelectInput;
  let fixture: ComponentFixture<SelectInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectInput],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
