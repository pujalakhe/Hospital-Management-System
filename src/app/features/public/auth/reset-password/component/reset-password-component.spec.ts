import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password-component';
import { ResetPasswordFormService } from '../services/reset-password-form-service/reset-password-form-service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as ResetPasswordActions from '../store/reset-password.action';
import {
  selectSendOTPLoading,
  selectResetPasswordLoading,
  selectSendOTPSuccess,
} from '../store/reset-password.selector';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let store: MockStore;
  let formService: jasmine.SpyObj<ResetPasswordFormService>;
  let mockStepper: jasmine.SpyObj<MatStepper>;

  const initialState = {
    sendOTPLoading: false,
    resetPasswordLoading: false,
    sendOTPSuccess: false,
  };

  beforeEach(async () => {
    const formServiceSpy = jasmine.createSpyObj('ResetPasswordFormService', [
      'buildEmailForm',
      'buildVerifyForm',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ResetPasswordFormService, useValue: formServiceSpy },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    formService = TestBed.inject(
      ResetPasswordFormService
    ) as jasmine.SpyObj<ResetPasswordFormService>;

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;

    
    mockStepper = jasmine.createSpyObj('MatStepper', ['next']);
    component.stepper = mockStepper;

    
    formService.buildEmailForm.and.returnValue(
      new FormGroup({
        email: new FormBuilder().control('test@example.com'),
      })
    );
    formService.buildVerifyForm.and.returnValue(
      new FormGroup({
        otp: new FormBuilder().control('123456'),
        newPassword: new FormBuilder().control('Password123'),
      })
    );

    // Mock selectors
    store.overrideSelector(selectSendOTPLoading, false);
    store.overrideSelector(selectResetPasswordLoading, false);
    store.overrideSelector(selectSendOTPSuccess, false);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build forms on init', () => {
    component.ngOnInit();
    expect(formService.buildEmailForm).toHaveBeenCalled();
    expect(formService.buildVerifyForm).toHaveBeenCalled();
    expect(component.emailForm).toBeTruthy();
    expect(component.verifyForm).toBeTruthy();
  });

  it('should select loading states from store', () => {
    component.otpLoading();
    expect(component.sendOTPLoading$).toBeDefined();
    expect(component.resetPasswordLoading$).toBeDefined();
  });

  it('should dispatch requestOtp when onRequestOtp is called with valid email', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.emailForm.setValue({ email: 'test@example.com' });

    component.onRequestOtp();

    expect(dispatchSpy).toHaveBeenCalledWith(
      ResetPasswordActions.requestOtp({
        payload: { email: 'test@example.com' },
      })
    );
  });


  it('should dispatch resetPassword when onResetPassword is called with valid forms', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.emailForm.setValue({ email: 'test@example.com' });
    component.verifyForm.setValue({ otp: '123456', newPassword: 'Pass@123' });

    component.onResetPassword();

    expect(dispatchSpy).toHaveBeenCalledWith(
      ResetPasswordActions.resetPassword({
        payload: {
          email: 'test@example.com',
          otp: '123456',
          newPassword: 'Pass@123',
        },
      })
    );
  });


  it('should move to next step when OTP send success is true', () => {
  const stepperSpy = jasmine.createSpyObj('MatStepper', ['next']);
  component.stepper = stepperSpy;
  store.overrideSelector(selectSendOTPSuccess, true);
  store.refreshState();
  fixture.detectChanges();
  expect(stepperSpy.next).toHaveBeenCalled();
});


  it('should complete destroy$ on ngOnDestroy', () => {
    const nextSpy = spyOn(component['destroy$'], 'next');
    const completeSpy = spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
