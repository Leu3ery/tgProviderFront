import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(Auth);

  if (req.url.includes('/login')) {
    return next(req);
  }

  if (!localStorage.getItem('token')) {
    if (!window.Telegram.WebApp.initData) {
      router.navigate(['/noTg']);
      return throwError(() => new Error('No Telegram initData'));
    } else {
      return auth.loginR(window.Telegram.WebApp.initData).pipe(
        switchMap(() => {
          const newToken = localStorage.getItem('token') || '';
          const reqWithToken = req.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` },
          });
          return next(reqWithToken);
        }),
        catchError((err) => {
          console.error('Login failed:', err);
          router.navigate(['/noTg']);
          return throwError(() => err);
        })
      );
    }
  }

  const reqWithToken = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token') || ''}`),
  });

  return next(reqWithToken).pipe(
    catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        if (!window.Telegram.WebApp.initData) {
          router.navigate(['/noTg']);
          return throwError(() => err);
        } else {
          console.log(window.Telegram.WebApp);
          console.log("initdata", window.Telegram.WebApp.initData);
          return auth.loginR(window.Telegram.WebApp.initData).pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('token') || '';
              const reqWithToken = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next(reqWithToken);
            }),
            catchError((err) => {
              console.error('Login failed:', err);
              router.navigate(['/noTg']);
              return throwError(() => err);
            })
          );
        }
      }
      return throwError(() => err);
    })
  );
};
