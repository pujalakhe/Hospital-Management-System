import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordFormService } from '../../services/change-password-form-service/change-password-form-service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as ChangePasswordActions from '../../store/change-password/changePassword.action';
import * as ChangePasswordSelectors from '../../store/change-password/changePassword.selector';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Directive, Input } from '@angular/core';

// Standalone stub for appAutoFocusInvalid directive
@Directive({
  selector: '[appAutoFocusInvalid]',
  standalone: true,
})
class AutoFocusInvalidStubDirective {
  @Input('appAutoFocusInvalid') formGroup?: FormGroup; // The input name should match the selector
}

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let store: MockStore;
  let formService: jasmine.SpyObj<ChangePasswordFormService>;

  const mockForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl(''),
  });

  beforeEach(async () => {
    const formServiceSpy = jasmine.createSpyObj('ChangePasswordFormService', [
      'buildChangePasswordForm',
      'applyTouchAndDirtyToForm',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        ReactiveFormsModule,
        AutoFocusInvalidStubDirective, // Import the standalone directive
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: ChangePasswordSelectors.selectIsLoading,
              value: false,
            },
          ],
        }),
        { provide: ChangePasswordFormService, useValue: formServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    formService = TestBed.inject(
      ChangePasswordFormService
    ) as jasmine.SpyObj<ChangePasswordFormService>;

    formService.buildChangePasswordForm.and.returnValue(mockForm);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(formService.buildChangePasswordForm).toHaveBeenCalled();
    expect(component.changePasswordForm).toBeTruthy();
  });

  it('should observe loading state from store', () => {
    component.observeLoadingState();
    let result: boolean | undefined;
    component.isLoading$?.subscribe((val) => (result = val));
    expect(result).toBeFalse();
  });

  it('should return correct form control using getControl()', () => {
    const control = component.getControl('oldPassword');
    expect(control).toBeInstanceOf(FormControl);
  });

  it('should dispatch changePassword action when form is valid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const validForm = new FormGroup({
      oldPassword: new FormControl('oldPass'),
      newPassword: new FormControl('newPass'),
      confirmNewPassword: new FormControl('newPass'),
    });
    component.changePasswordForm = validForm;

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      ChangePasswordActions.changePassword({
        credentials: { oldPassword: 'oldPass', newPassword: 'newPass' },
      })
    );
  });

  it('should call applyTouchAndDirtyToForm when form is invalid', () => {
    // Create a spy on the form's valid property
    const invalidForm = new FormGroup({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl(''),
    });

    // Force the form to be invalid
    Object.defineProperty(invalidForm, 'valid', {
      get: () => false,
    });
    Object.defineProperty(invalidForm, 'invalid', {
      get: () => true,
    });

    component.changePasswordForm = invalidForm;

    component.onSubmit();

    expect(formService.applyTouchAndDirtyToForm).toHaveBeenCalledWith();
  });
});
