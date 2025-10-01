import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http = inject(HttpClient)
  router = inject(Router)
  token: string | null = localStorage.getItem("token");
  user = signal<User | null>(null)

  constructor(){
    this.token = localStorage.getItem("token");
  }

    login(initData:string){
    return this.http.post<{token: string}>('http://45.148.29.44:8000/api/users/login',{initData}).subscribe({
      next: (res)=>{
        this.token = res.token
        localStorage.setItem("token",res.token);

      },
      error:() => {
        this.logout()
      }
    })
    }

    logout(){
    localStorage.removeItem("token");
    this.token = null;
    this.user.set(null);
      this.router.navigate(['/open-in-telegram']);
    }
    getMe(){
    return this.http.get<User>('http://45.148.29.44:8000/api/users/me' , {headers:{Authorization: `Bearer ${this.token}` }}).subscribe({
      next: (res) => {
        this.user.set(res);
      },
      error: () => {
        this.logout();
      }
    })
    }

}
