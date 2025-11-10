import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup-component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { SignupFormService } from '../service/form/signup-form-service';
import { SignupApiService } from '../service/api/signup-api-service';
import { provideRouter } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: Store;
  let formService: SignupFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      declarations: [SignupComponent],
      providers: [
        SignupFormService,
        { provide: SignupApiService, useValue: {} },
        provideRouter([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    formService = TestBed.inject(SignupFormService);
    spyOn(store, 'dispatch').and.callThrough();
    component.signupForm = formService.buildSignupForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get form control', () => {
    const firstNameControl = component.getControl('firstName');
    expect(firstNameControl).toBeTruthy();
    expect(firstNameControl?.value).toBe('');
  });

  it('should get address control', () => {
    const countryControl = component.getAddressControl('countryId');
    expect(countryControl).toBeTruthy();
  });

  it('should mark form touched and not dispatch when invalid', () => {
    component.signupForm?.patchValue({ firstName: '' }); // required
    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.signupForm?.touched).toBeTrue();
  });

  it('should dispatch signup when form is valid', () => {
    const form = component.signupForm!;
    form.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      mobileNo: '9876543210',
      citizenshipNo: '123456',
      dob: new Date('2000-01-01'),
      departmentId: 1,
      role: 1,
      gender: 1,
      nationality: 'Nepalese',
      startDate: new Date('2025-01-01'),
      password: 'Strong1!',
      confirmPassword: 'Strong1!',
      address: { name: 'Street 1', countryId: 1, cityId: 1 },
    });

    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
