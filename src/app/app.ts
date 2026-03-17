import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './core/services/auth';
import type { WebApp } from '@twa-dev/types';
import { JsonPipe } from '@angular/common';
import { User } from './models/auth.models';
import { config } from '../environment';

declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  auth = inject(Auth);

  constructor() {
    if (config.devMode && !window.Telegram?.WebApp?.initData) {
      this.auth.user.set(config.devUser);
      return;
    }

    this.auth.getMe().subscribe((user) => this.auth.user.set(user));

    setInterval(() => {
      this.auth.getMe().subscribe({
        next: (user) => this.auth.user.set(user),
        error: (err) => console.error(err),
      });
    }, 8000);
  }
}
