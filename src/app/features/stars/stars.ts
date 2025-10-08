import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {config} from '../../../environment';
import {tap} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Auth} from '../../core/services/auth';
import {GetUser} from './get-user';
import {DecimalPipe, CommonModule} from '@angular/common';
import {Recipient, TonRate} from '../../models/auth.models';


@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DecimalPipe
  ],
  templateUrl: './stars.html',
  styleUrls: ['./stars.css']
})
export class Stars {
  isError = false;
  isSuccess = false;
  isError_2 = false;
  isClassic = false;
  resi: Recipient|null = null ;
  proof_user = inject(GetUser);
  recipientUsername: string = "";
  mes = "";
  mes_2 :string|number = ""
  starAmount : number = 50;
  usdAmount : number = 0;
  selectedPackageAmount: number | null = null; // выбранный пакет (радио)#
  tonRate : number = 3;

  packages: { amount: number; price: number }[] = [
    { amount: 50,   price: 0 },
    { amount: 500,  price: 0 },
    { amount: 2500, price: 0 },
  ];
  show = false;



constructor() {
  this.getTonRate()

}



getTonRate(){
  this.proof_user.get_TonRate().subscribe({
    next: (res ) => {
      this.tonRate = res.tonRate;
      console.log(this.tonRate);
      this.packages = this.packages.map(p => ({
        ...p,
        price: ((0.015 * p.amount) / this.tonRate) + config.koefizzient * ((0.015 * p.amount) / this.tonRate)
      }));
      this.checkStarsAmount()
    },
    error: err => {
      console.log(err);
    }
  })

}

  getUserInfo() {
    this.proof_user.proof_UserName(this.recipientUsername).subscribe({
      next: (res: Recipient ) => {
        this.resi = res;
        this.mes = this.resi.name;
        this.isSuccess = true;
        this.isError = false;
      },
      error: (err : any) => {this.mes = "No Telegram users found.";
      this.isError = true;
      this.isSuccess = false;
      this.resi = null;}

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
      this.isError_2 = true;
      this.isClassic = false;
      this.mes_2 = "You can buy a minimum of 50 stars";
    }else {
      this.isError_2 = false;
      this.isClassic = true;
      this.mes_2 = ((0.015 * this.starAmount) / this.tonRate) + config.koefizzient * ((0.015 * this.starAmount) / this.tonRate);
      this.getUSD()
    }
}
  onPackageChange(pkgAmount: number) {
    this.selectedPackageAmount = pkgAmount;
    this.starAmount = pkgAmount;
    this.checkStarsAmount()// синхронизируем с инпутом
  }
  getUSD(){
  this.usdAmount = this.starAmount * 0.015 + (this.starAmount * 0.015)*config.koefizzient;

  }
  buyStars(){

  }


  protected readonly tap = tap;
}
