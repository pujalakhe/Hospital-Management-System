import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription, timer, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil, filter, take, map } from 'rxjs/operators';
import * as ResetPasswordActions from '../../store/reset-password-store/reset-password.action';
import { selectResetPasswordState } from '../../store/reset-password-store/reset-password.selector';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password-component.html',
  styleUrls: ['./reset-password-component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  // Form groups
  emailFormGroup!: FormGroup;
  otpFormGroup!: FormGroup;
  passwordFormGroup!: FormGroup;

  // Steps (0 = email, 1 = OTP, 2 = new password, 3 = success)
  currentStep$ = new BehaviorSubject<number>(0);

  // Loading / state subjects
  sendingOTP$ = new BehaviorSubject<boolean>(false);
  verifyingOTP$ = new BehaviorSubject<boolean>(false);
  resettingPassword$ = new BehaviorSubject<boolean>(false);

  // Email and OTP logic
  email$ = new BehaviorSubject<string>('');
  canResendOTP$ = new BehaviorSubject<boolean>(true);
  otpTimer$ = new BehaviorSubject<number>(0);
  private otpSubscription?: Subscription;
  private destroy$ = new Subject<void>();

  // Password visibility toggles
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  private setupStoreSubscriptions(): void {
  this.store.pipe(
    select(selectResetPasswordState),
    takeUntil(this.destroy$)
  ).subscribe(state => {
    // Update loading states
    this.sendingOTP$.next(state.loading.sendOTP);
    this.verifyingOTP$.next(state.loading.verifyOTP);
    this.resettingPassword$.next(state.loading.resetPassword);

    // Handle OTP sent successfully
    if (state.success.sendOTP) {
      this.currentStep$.next(1);
      this.startOTPTimer();
    }

    // Handle errors
    if (state.error.sendOTP) {
      console.error('OTP Error:', state.error.sendOTP);
      // Show error message to user
    }
  });
}
  

  ngOnInit(): void {
    this.buildForms();
     this.setupStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.otpSubscription) this.otpSubscription.unsubscribe();
  }

  

  /** Build all form groups */
  private buildForms(): void {
    this.emailFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpFormGroup = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.passwordFormGroup = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  /** Get control by name (used in template) */
  getControl(name: string): FormControl {
    const controlMap: { [key: string]: FormControl | null } = {
      'email': this.emailFormGroup?.get('email') as FormControl,
      'otp': this.otpFormGroup?.get('otp') as FormControl,
      'newPassword': this.passwordFormGroup?.get('newPassword') as FormControl,
      'confirmPassword': this.passwordFormGroup?.get('confirmPassword') as FormControl
    };
    
    const control = controlMap[name];
    if (!control) {
      throw new Error(`Control '${name}' not found`);
    }
    return control;
  }

  /** Validator for matching new password and confirmation */
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  /** Step navigation */
  previousStep(): void {
    const current = this.currentStep$.value;
    if (current > 0) this.currentStep$.next(current - 1);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /** Step 1: Send OTP */
  sendOTP(): void {
    if (this.emailFormGroup.invalid) return;
    
    const emailValue = this.emailFormGroup.value.email;
    this.email$.next(emailValue);
    
    // Dispatch the action to trigger the effect
    this.store.dispatch(ResetPasswordActions.sendOTP({ email: emailValue }));
  }

  /** Step 2: Verify OTP */
  verifyOTP(): void {
    if (this.otpFormGroup.invalid) return;
    const otp = this.otpFormGroup.value.otp;
    this.store.dispatch(ResetPasswordActions.verifyOTP({ otp }));
  }

  /** Resend OTP logic */
  resendOTP(): void {
    if (!this.canResendOTP$.value) return;
    const email = this.email$.value;
    if (email) {
      this.store.dispatch(ResetPasswordActions.sendOTP({ email }));
      this.startOTPTimer();
    }
  }

  /** Timer for OTP resend */
  private startOTPTimer(): void {
    this.canResendOTP$.next(false);
    let countdown = 30;
    this.otpTimer$.next(countdown);

    if (this.otpSubscription) this.otpSubscription.unsubscribe();

    this.otpSubscription = timer(1000, 1000).subscribe(() => {
      countdown--;
      this.otpTimer$.next(countdown);
      if (countdown <= 0) {
        this.canResendOTP$.next(true);
        this.otpSubscription?.unsubscribe();
      }
    });
  }

  /** Step 3: Reset Password */
resetPassword(): void {
  if (this.passwordFormGroup.invalid) return;

  const { email, newPassword, otp } = {
    email: this.email$.value,
    newPassword: this.passwordFormGroup.value.newPassword,
    otp: this.otpFormGroup.value.otp
  };

  this.store.dispatch(ResetPasswordActions.resetPassword({ 
    email, 
    newPassword, 
    otp 
  }));
}
}