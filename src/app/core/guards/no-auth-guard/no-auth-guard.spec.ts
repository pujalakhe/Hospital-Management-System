import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Injector, runInInjectionContext } from '@angular/core';

import { noAuthGuard } from './no-auth-guard';
import { AuthService } from '../../service/auth-service/auth-service';
import { ROUTER_PATHS } from '../../constants/router-path.constant';

describe('noAuthGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let injector: Injector;

  beforeEach(() => {
    const aSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: aSpy },
        { provide: Router, useValue: rSpy },
      ],
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    injector = TestBed.inject(Injector);
  });

  function runGuard(): ReturnType<typeof noAuthGuard> {
    // Run the guard in Angular injection context
    return runInInjectionContext(injector, () =>
      noAuthGuard(null as any, null as any)
    );
  }

  it('should allow access to login and signup if user is not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = runGuard();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should block access and navigate to dashboard if user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = runGuard();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith([ROUTER_PATHS.DASHBOARD]);
  });
});
