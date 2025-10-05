import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { config } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http = inject(HttpClient);

  user = signal<User | null>(null);

  loginR(initData: string) {
    return this.http.post<{ token: string; }>(`${config.basicURL}/users/login`, { initData }).pipe(tap(res => {
      localStorage.setItem('token', res.token);
    }))
  }

  getMe() {
    return this.http.get<User>(`${config.basicURL}/users/me`)
  }
}
