import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Recipient } from '../../models/auth.models';
import { Auth } from '../../core/services/auth';
import { GetUser } from '../stars/get-user';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './premium.html',
  styleUrl: './premium.css',
})
export class Premium {
  isError = false;
  isSuccess = false;
  isError_2 = false;
  isClassic = false;
  resi: Recipient | null = null;
  proof_user = inject(GetUser);
  auth = inject(Auth);

  recipientUsername = '';
  mes = '';
  mes_2: string | number = '';
  selectedMonths = 12;
  isLoadingPrices = false;

  packages: { months: number; price: number | null }[] = [
    { months: 3, price: null },
    { months: 6, price: null },
    { months: 12, price: null },
  ];

  get selectedPrice(): number | null {
    return this.packages.find((pkg) => pkg.months === this.selectedMonths)?.price ?? null;
  }

  getUserInfo() {
    this.proof_user.proof_PremiumUserName(this.recipientUsername, this.selectedMonths).subscribe({
      next: (res: Recipient) => {
        this.resi = res;
        this.mes = this.resi.name;
        this.isSuccess = true;
        this.isError = false;
        this.loadPrices();
      },
      error: () => {
        this.mes = 'No Telegram users found.';
        this.isError = true;
        this.isSuccess = false;
        this.resi = null;
        this.resetPrices();
      },
    });
  }

  checkEmpty() {
    if (this.recipientUsername.trim() === '') {
      this.mes = '';
      this.isError = false;
      this.isSuccess = false;
      this.resi = null;
      this.resetPrices();
    }
  }

  onPackageChange(months: number) {
    this.selectedMonths = months;
    if (this.resi) {
      this.loadPrices();
      return;
    }

    this.checkPremiumAmount();
  }

  resetPrices() {
    this.packages = this.packages.map((pkg) => ({ ...pkg, price: null }));
    this.checkPremiumAmount();
  }

  loadPrices() {
    if (!this.recipientUsername.trim()) {
      this.resetPrices();
      return;
    }

    this.isLoadingPrices = true;
    const requests = this.packages.map((pkg) =>
      this.proof_user.previewPremium(this.recipientUsername, pkg.months)
    );

    forkJoin(requests).subscribe({
      next: (responses) => {
        this.packages = this.packages.map((pkg, index) => ({
          ...pkg,
          price: responses[index].tonAmount,
        }));
        this.isLoadingPrices = false;
        this.checkPremiumAmount();
      },
      error: () => {
        this.isLoadingPrices = false;
        this.isError_2 = true;
        this.isClassic = false;
        this.mes_2 = 'Unable to calculate Premium price right now';
      },
    });
  }

  checkPremiumAmount() {
    const selectedPrice = this.selectedPrice;

    if (this.isLoadingPrices) {
      this.isError_2 = false;
      this.isClassic = true;
      this.mes_2 = 'Calculating price...';
      return;
    }

    if (selectedPrice == null) {
      this.isError_2 = false;
      this.isClassic = true;
      this.mes_2 = 'Confirm the recipient to see the Premium price';
      return;
    }

    this.isError_2 = false;
    this.isClassic = true;
    this.mes_2 = selectedPrice;
  }

  buyPremium() {
    const selectedPrice = this.selectedPrice;

    if (selectedPrice == null) {
      return;
    }

    if (selectedPrice * 1000000000 >= this.auth.user()!.balance) {
      alert('You have not enough TON!');
      return;
    }

    if (
      confirm(
        'You are buying Telegram Premium for ' +
          this.selectedMonths +
          ' months to @' +
          this.recipientUsername +
          '. Is everything okay?'
      )
    ) {
      this.proof_user.buyPremium(this.recipientUsername, this.selectedMonths).subscribe({
        next: () => {
          alert(
            'You successfully bought Telegram Premium for ' + this.selectedMonths + ' months!'
          );
        },
        error: (err) => {
          alert(err?.error?.message || 'Premium purchase failed');
        },
      });
    }
  }
}
