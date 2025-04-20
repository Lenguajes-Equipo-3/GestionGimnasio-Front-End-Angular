import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();
  const role = authService.getUserRole();

  if (!isAuth) {
    router.navigate(['/login']);
    return false;
  }
  alert('Login redirec' + role); // Alert for successful login

  if (role === 'admin') {
    router.navigate(['/admin']);
  } else if (role === 'usuario') {
    router.navigate(['/dashboard']);
  } else {
    router.navigate(['/login']);
  }

  return false;
};
