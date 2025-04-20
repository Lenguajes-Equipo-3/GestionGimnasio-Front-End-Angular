import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string[];
  const userRole = authService.getUserRole();
  console.log('RoleGuard → expectedRoles:', expectedRoles, 'userRole:', userRole);

  if (!authService.isAuthenticated() || !expectedRoles.includes(userRole)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};


