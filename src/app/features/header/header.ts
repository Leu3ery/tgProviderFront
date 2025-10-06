import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { CurrencyPipe } from '@angular/common';
import { config } from '../../../environment';

declare let TON_CONNECT_UI: any;

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  auth = inject(Auth);


  tonConnectUI: any;

  // transaction = {
  //   validUntil: Math.floor(Date.now() / 1000) + 300, // 300 sec
  //   messages: [
  //         {
  //             address: "UQBbhd0rMrKrt4uNkSY2YI8elK-EPfVREaZ5RBYupZMlfw-b", // destination address
  //             amount: "10000000", // Toncoin in nanotons 
  //         }
  //     ]
  // }

  
  // async sendTransactionHandler() {
  //   const result = await this.tonConnectUI.sendTransaction(this.transaction);
  //   console.log('Transaction result:', result);
  // }


  ngAfterViewInit(): void {
    this.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
      manifestUrl: config.manifestURL,
      buttonRootId: 'ton-connect',
    });
  }

  async connect() {
    try {
      await this.tonConnectUI.openModal();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  }
}
