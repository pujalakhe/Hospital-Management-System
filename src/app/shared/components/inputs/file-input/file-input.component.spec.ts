import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInput } from './file-input.component';

describe('FileInput', () => {
  let component: FileInput;
  let fixture: ComponentFixture<FileInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileInput],
    }).compileComponents();

    fixture = TestBed.createComponent(FileInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
