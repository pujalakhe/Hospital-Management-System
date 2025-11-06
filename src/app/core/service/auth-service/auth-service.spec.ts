import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';
import { ROUTER_PATHS } from '../../constants/router-path.constant';
import { AUTH_TOKEN_KEY } from '../../constants/storage.constants';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: rSpy }],
    });

    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should return null if token is not set', () => {
    expect(service.getUserToken()).toBeNull();
  });

  it('should return the token if it exists', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'mock-token');
    expect(service.getUserToken()).toBe('mock-token');
  });

  it('should return true for isAuthenticated if token exists', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'mock-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false for isAuthenticated if token does not exist', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should remove token and navigate to login on logout', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'mock-token');

    service.logout();

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith([ROUTER_PATHS.LOGIN]);
  });
});
