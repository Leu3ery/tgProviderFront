import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Auth} from './core/services/auth';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(protected auth: Auth) {
    this.initAuth()
  }
  private initAuth() {
    if(this.auth.token){
      this.auth.getMe()
    }else{
      const tg = (window as any).Telegram?.WebApp;
      const initDATA = tg?.InitData;

      if(initDATA){
        this.auth.login(initDATA);
      }else {
        this.auth.logout()
      }


    }
  }


}
