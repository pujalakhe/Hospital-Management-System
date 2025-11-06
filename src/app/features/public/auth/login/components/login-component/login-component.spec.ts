// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
// import { By } from '@angular/platform-browser';

// import { LoginComponent } from './login-component';
// import { LoginFormService } from '../../services/login-form-service/login-form-service';
// import { login } from '../../store/login.action';
// import { ROUTER_PATHS } from '../../../../../../core/constants/router-path.constant';

// class MockLoginFormService {
//   mockForm = new FormGroup({
//     username: new FormControl(''),
//     password: new FormControl(''),
//   });

//   buildLoginForm() {
//     return this.mockForm;
//   }
//   applyTouchAndDirtyToForm = jasmine.createSpy('applyTouchAndDirtyToForm');
// }

// class MockRouter {
//   navigate = jasmine.createSpy('navigate');
// }

// class MockStore {
//   dispatch = jasmine.createSpy('dispatch');
//   select = jasmine.createSpy('select');
// }

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let loginFormService: MockLoginFormService;
//   let router: MockRouter;
//   let store: MockStore;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [ReactiveFormsModule],
//       providers: [
//         { provide: LoginFormService, useClass: MockLoginFormService },
//         { provide: Router, useClass: MockRouter },
//         { provide: Store, useClass: MockStore },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     loginFormService = TestBed.inject(LoginFormService) as any;
//     router = TestBed.inject(Router) as any;
//     store = TestBed.inject(Store) as any;

//     store.select.withArgs(jasmine.any(Function)).and.returnValue(of(false));

//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should build login form on init', () => {
//     expect(component.loginForm).toBeTruthy();
//     expect(component.loginForm instanceof FormGroup).toBeTrue();
//   });

//   it('should initialize loading$ and error$ observables', () => {
//     expect(store.select).toHaveBeenCalled();
//     expect(component.loading$).toBeDefined();
//     expect(component.error$).toBeDefined();
//   });

//   describe('onSubmit()', () => {
//     it('should call applyTouchAndDirtyToForm if form is invalid', () => {
//       component.loginForm?.patchValue({ username: '', password: '' });
//       component.onSubmit();
//       expect(loginFormService.applyTouchAndDirtyToForm).toHaveBeenCalled();
//       expect(store.dispatch).not.toHaveBeenCalled();
//     });

//     it('should dispatch login action when form is valid', () => {
//       component.loginForm?.patchValue({ username: 'john', password: 'doe123' });
//       component.onSubmit();
//       expect(store.dispatch).toHaveBeenCalledWith(
//         login({ credentials: { username: 'john', password: 'doe123' } })
//       );
//     });
//   });

//   describe('navigateTo()', () => {
//     it('should navigate to signup route', () => {
//       component.navigateTo();
//       expect(router.navigate).toHaveBeenCalledWith([ROUTER_PATHS.SIGNUP]);
//     });
//   });

//   describe('Template rendering', () => {
//     it('should show the loader when loading$ is true', () => {
//       (store.select as jasmine.Spy).and.returnValue(of(true));
//       component.loading$ = of(true);
//       fixture.detectChanges();

//       const loader = fixture.debugElement.query(By.css('app-loader-component'));
//       expect(loader).toBeTruthy();
//     });

//     it('should show the login form when loading$ is false', () => {
//       (store.select as jasmine.Spy).and.returnValue(of(false));
//       component.loading$ = of(false);
//       fixture.detectChanges();

//       const form = fixture.debugElement.query(By.css('form'));
//       expect(form).toBeTruthy();
//     });

//     it('should call navigateTo() on "Sign up" link click', () => {
//       spyOn(component, 'navigateTo');
//       const link = fixture.debugElement.query(
//         By.css('a.hover\\:underline:last-child')
//       );
//       link.triggerEventHandler('click', {});
//       expect(component.navigateTo).toHaveBeenCalled();
//     });
//   });
// });
