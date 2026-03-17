import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { config } from '../../../environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(Auth);
  const telegramInitData = window.Telegram?.WebApp?.initData;

  if (config.devMode && req.url.endsWith('/users/me')) {
    auth.user.set(config.devUser);

    return next(
      req.clone({
        headers: req.headers.delete('Authorization'),
      })
    ).pipe(
      catchError(() => {
        return of(new HttpResponse({ status: 200, body: config.devUser }));
      })
    );
  }

  if (req.url.includes('/login')) {
    return next(req);
  }

  if (!localStorage.getItem('token')) {
    if (!telegramInitData) {
      if (config.devMode) {
        return next(req);
      }

      router.navigate(['/noTg']);
      return throwError(() => new Error('No Telegram initData'));
    } else {
      return auth.loginR(telegramInitData).pipe(
        switchMap(() => {
          const newToken = localStorage.getItem('token') || '';
          const reqWithToken = req.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` },
          });
          return next(reqWithToken);
        }),
        catchError((err) => {
          console.error(err);
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
        if (!telegramInitData) {
          if (config.devMode) {
            return throwError(() => err);
          }

          router.navigate(['/noTg']);
          return throwError(() => err);
        } else {
          return auth.loginR(telegramInitData).pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('token') || '';
              const reqWithToken = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next(reqWithToken);
            }),
            catchError((err) => {
              console.error(err);
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
