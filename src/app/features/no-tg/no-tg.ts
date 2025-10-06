import { Component, effect, inject } from '@angular/core';
import { config } from '../../../environment';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-tg',
  imports: [],
  templateUrl: './no-tg.html',
  styleUrl: './no-tg.css'
})
export class NoTg {
  config = config;
  auth = inject(Auth);
  router = inject(Router);

  constructor() {
    effect(() => {
      let user = this.auth.user()
      if (user) {
        this.router.navigate(['']);
      }
    })
  }
}
