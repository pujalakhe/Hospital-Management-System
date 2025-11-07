import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { LoginComponent } from './login-component';
import { LoginFormService } from '../../services/login-form-service/login-form-service';
import { ROUTER_PATHS } from '../../../../../../core/constants/router-path.constant';
import { login } from '../../store/login.action';
import * as selectors from '../../store/login.selector';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginFormServiceSpy: jasmine.SpyObj<LoginFormService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const formServiceSpy = jasmine.createSpyObj('LoginFormService', [
      'buildLoginForm',
      'applyTouchAndDirtyToForm',
    ]);
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);
    const sSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginFormService, useValue: formServiceSpy },
        { provide: Router, useValue: rSpy },
        { provide: Store, useValue: sSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginFormServiceSpy = TestBed.inject(
      LoginFormService
    ) as jasmine.SpyObj<LoginFormService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;

    // Mock selectors
    storeSpy.select.and.callFake((selector: any) => {
      if (selector === selectors.selectLoading) return of(true);
      if (selector === selectors.selectError) return of(null);
      return of(null);
    });

    // Mock form group
    const mockForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
    loginFormServiceSpy.buildLoginForm.and.returnValue(mockForm);
  });

  it('should create component and initialize form, loading$, error$', () => {
    component.ngOnInit();

    expect(component.loginForm).toBeDefined();
    expect(component.loading$).toBeDefined();
    expect(component.error$).toBeDefined();
    expect(loginFormServiceSpy.buildLoginForm).toHaveBeenCalled();
  });

  it('getControl should return form control', () => {
    component.ngOnInit();
    const control = component.getControl('email');
    expect(control).toBeInstanceOf(FormControl);
  });

  it('onSubmit should apply touch and dirty when form is invalid', () => {
    component.ngOnInit();
    component.loginForm?.setErrors({ invalid: true });

    component.onSubmit();

    expect(loginFormServiceSpy.applyTouchAndDirtyToForm).toHaveBeenCalled();
    expect(storeSpy.dispatch).not.toHaveBeenCalled();
  });

  it('onSubmit should dispatch login when form is valid', () => {
    component.ngOnInit();
    component.loginForm?.setValue({
      email: 'test@test.com',
      password: '123456',
    });

    component.onSubmit();

    expect(loginFormServiceSpy.applyTouchAndDirtyToForm).not.toHaveBeenCalled();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      login({
        credentials: { email: 'test@test.com', password: '123456' },
      })
    );
  });

  it('navigateTo should navigate to signup', () => {
    component.navigateTo();
    expect(routerSpy.navigate).toHaveBeenCalledWith([ROUTER_PATHS.SIGNUP]);
  });
});
