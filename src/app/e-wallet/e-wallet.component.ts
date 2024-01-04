import { Component } from '@angular/core';

interface Transaction {
  amount: number;
  item: string;
  date: Date;
  type: string;
}

interface AddToWallet{
  amount: number;
  date: Date;
  type: string;
}


@Component({
  selector: 'app-e-wallet',
  templateUrl: './e-wallet.component.html',
  styleUrls: ['./e-wallet.component.scss']
})
export class EWalletComponent {
  balance: number = 0;
  transactions: Transaction[] = [];
  addtowallet: AddToWallet[] = [];
  income: number = 0 ;
  Expenses: number = 0;
  constructor(){
    const storedBalance = localStorage.getItem('balance');
      if (storedBalance) {
        this.balance = +storedBalance;
      }

    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
    }
  }

  addMoney(amount: number) {
    this.balance += amount;
    this.addtowallet.push({ amount, date: new Date(), type: 'credit' });
    this.income += amount;
    this.saveData();
  }

  makePurchase(amount: number, item: string) {
    if (this.balance < amount) {
      alert('Insufficient balance!');
      return;
    }

    this.balance -= amount;
    this.transactions.push({ amount, item, date: new Date(), type: 'debit' });
    this.Expenses -= amount
    this.saveData();
    alert('Purchase successful!');
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  private saveData() {
    localStorage.setItem('balance', this.balance.toString());
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
}
