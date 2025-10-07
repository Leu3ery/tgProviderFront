import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { CurrencyPipe } from '@angular/common';
import { config } from '../../../environment';
import { FormsModule } from '@angular/forms';
import { Transaktions } from './transaktions';
import { firstValueFrom } from 'rxjs';

declare let TON_CONNECT_UI: any;

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(Auth);
  transactions = inject(Transaktions);

  tonConnectUI: any;
  popupOpen = false;
  amount: number | null = null;
  errorMessage: string | null = null;

  openPopup() {
    this.popupOpen = true;
  }

  closePopup() {
    this.popupOpen = false;
    this.amount = null;
  }

  async confirm() {
    const value = Number(this.amount);

    if (!value || isNaN(value) || value <= 0) {
      this.errorMessage = 'Enter a valid amount greater than 0';
      return;
    }

    if (!this.tonConnectUI || !this.tonConnectUI.account) {
      this.errorMessage = 'Please connect your wallet first.';
      return;
    }

    this.errorMessage = null;

    try {
      const data = await firstValueFrom(
        this.transactions.createTransaction({
          amount: value * 1000000000,
          senderAddress: this.tonConnectUI.account.address,
          type: 'deposit',
        })
      );

      console.log('Transaction recorded:', data);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Failed to record transaction. Please try again.';
      return;
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 300, // 300 sec
      messages: [
        {
          address: config.tonAddress, // destination address
          amount: String(value * 1000000000), // Toncoin in nanotons
        },
      ],
    };
    const result = await this.tonConnectUI.sendTransaction(transaction);
    // console.log('Transaction result:', result);
    this.closePopup();
  }

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
      console.error(error);
    }
  }
}
