// change-password.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordFormService } from '../../services/change-password-form-service/change-password-form-service';
import { Store, StoreModule } from '@ngrx/store';
import * as ChangePasswordActions from '../../store/change-password/changePassword.action';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let mockFormService: jasmine.SpyObj<ChangePasswordFormService>;
  let store: Store;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('ChangePasswordFormService', [
      'buildChangePasswordForm',
      'applyTouchAndDirtyToForm',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      declarations: [ChangePasswordComponent],
      providers: [
        { provide: ChangePasswordFormService, useValue: mockFormService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    // Mock form group returned by the service
    mockFormService.buildChangePasswordForm.and.returnValue(
      new FormGroup({
        oldPassword: new FormControl(''),
        newPassword: new FormControl(''),
      })
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.changePasswordForm).toBeDefined();
    expect(mockFormService.buildChangePasswordForm).toHaveBeenCalled();
  });

  it('should return FormControl from getControl', () => {
    const oldPasswordControl = component.getControl('oldPassword');
    expect(oldPasswordControl).toBeTruthy();
    expect(oldPasswordControl instanceof FormControl).toBeTrue();
  });

  it('should call applyTouchAndDirtyToForm if form is invalid on submit', () => {
    component.changePasswordForm?.setErrors({ required: true });
    component.onSubmit();
    expect(mockFormService.applyTouchAndDirtyToForm).toHaveBeenCalled();
  });

  it('should dispatch changePassword action if form is valid on submit', () => {
    spyOn(store, 'dispatch');
    component.changePasswordForm?.setValue({
      oldPassword: 'oldPass123',
      newPassword: 'newPass456',
    });
    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      ChangePasswordActions.changePassword({
        oldPassword: 'oldPass123',
        newPassword: 'newPass456',
      })
    );
  });
});
