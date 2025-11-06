import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../../service/auth-service/auth-service';
import { ROUTER_PATHS } from '../../constants/router-path.constant';

export const noAuthGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();

  if (isLoggedIn) {
    router.navigate([ROUTER_PATHS.DASHBOARD]);
    return false;
  }
  return true;
};
