import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { config } from '../../../environment';


@Injectable({
  providedIn: 'root',
})
export class Transaktions {
  http = inject(HttpClient);

  createTransaction(transactionData: {
    amount: number;
    senderAddress: string;
    type: 'deposit' | 'withdraw';
  }) {
    return this.http.post(`${config.basicURL}/transactions`, transactionData)
  }
}
