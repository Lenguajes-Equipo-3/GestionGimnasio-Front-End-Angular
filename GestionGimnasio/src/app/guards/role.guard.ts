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
  const userRole = authService.getRol(); // Método ya implementado en tu AuthService


  // Verifica si hay token y si el rol del usuario está autorizado
  if (!authService.isAuthenticated() || !userRole || !expectedRoles.includes(userRole.toUpperCase())) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
