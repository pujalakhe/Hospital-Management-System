import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeaderComponent } from './form-header-component';
import { By } from '@angular/platform-browser';

describe('FormHeaderComponent', () => {
  let component: FormHeaderComponent;
  let fixture: ComponentFixture<FormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the heading input', () => {
    component.heading = 'Main Heading';
    fixture.detectChanges();

    const headingEl = fixture.debugElement.query(By.css('h1'));
    expect(headingEl.nativeElement.textContent).toContain('Main Heading');
  });

  it('should display the subHeading input', () => {
    component.subHeading = 'Sub Heading';
    fixture.detectChanges();

    const subHeadingEl = fixture.debugElement.query(By.css('p'));
    expect(subHeadingEl.nativeElement.textContent).toContain('Sub Heading');
  });
});
