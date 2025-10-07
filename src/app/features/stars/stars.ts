import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {config} from '../../../environment';
import {tap} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Auth} from '../../core/services/auth';
import {GetUser} from './get-user';
  interface Recipient{
    recipient: string;
    photo: string;
    name: string;

  }

@Component({
  selector: 'app-stars',
  imports: [
    FormsModule
  ],
  templateUrl: './stars.html',
  styleUrl: './stars.css'
})
export class Stars {
  isError = false;
  isSuccess = false;
  resi: Recipient|null = null ;
  proof_user = inject(GetUser);
  recipientUsername: string = "";
  mes = "";
  mes_2 = ""
  starAmount : number = 50;






  getUserInfo() {
    this.proof_user.proof_UserName(this.recipientUsername).subscribe({
      next: (res:Recipient) => {this.resi = res;
      this.mes = this.resi.name
        this.isSuccess = true
        this.isError = false
     }
      ,

      error: (err : any) => {this.mes = "No Telegram users found.";
      this.isError = true;
      this.isSuccess = false;}

    });
}
checkEmpty(){
  if (this.recipientUsername.trim() === '') {
    this.mes = "";
    this.isError = false;
    this.isSuccess = false;

  }

}
checkStarsAmount(){
    if (this.starAmount < 50) {
      this.mes_2 = "You can buy a minimum of 50 stars";
    }else {
      this.mes_2 = "";
    }
}







}
