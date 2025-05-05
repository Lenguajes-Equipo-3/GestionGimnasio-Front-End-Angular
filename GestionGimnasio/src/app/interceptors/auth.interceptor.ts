// src/app/interceptors/auth.interceptor.ts
import { inject, Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Excluir la URL de login (ajústala si cambia)
  const isLoginRequest = req.url.includes('/auth/login');

  if (isLoginRequest) {
    return next(req); // 🔒 No modificar esta solicitud
  }

  const token = localStorage.getItem('token');

  if (!token || !authService.isSessionActive()) {
    authService.logout();
    router.navigate(['/login']);
    return next(req); // Permitir seguir, pero sin token válido
  }

  authService.refreshLastAction();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};

