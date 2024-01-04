import { Component , Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';

import { Transaction , AddToWallet } from '../types/interfaces.component'; 

@Component({
  selector: 'app-e-wallet',
  templateUrl: './e-wallet.component.html',
  styleUrls: ['./e-wallet.component.scss'],
}) 

export class EWalletComponent{
  balance: number = 0;
  transactions: Transaction[] = [];
  addtowallet: AddToWallet[] = [];

  income: number = 0 ;
  Expenses: number = 0;

  walletFlag: boolean = false;
  showhistory : boolean;
  addmoneyFlag : boolean;
  withdrawflag : boolean;
  wrongCredintial : boolean = false;
  wrongPurchaseAmount: boolean;
  insufficientFlag: boolean;
  rateInput: number;


  minValidator = new FormGroup({
    amount: new FormControl([Validators.min(1),Validators.required])
  })

  withdrawForm = new FormGroup({
      purchaseAmount : new FormControl([Validators.min(1),Validators.required]),
      purchaseItem : new FormControl('',[Validators.maxLength(25)])
  })
  constructor(private formBuilder:FormBuilder){
    const storedBalance = localStorage.getItem('balance');
      if (storedBalance) {
        this.balance = +storedBalance;
      }

    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
    }
  }
 
  get f () { return this.minValidator.controls; }

  setHistoryflag(newHistoryflag : boolean){
        this.showhistory =newHistoryflag;
        this.addmoneyFlag = false;
        this.withdrawflag = false;
  }

  setWalletflag(newWalletflag : boolean){
    this.walletFlag =newWalletflag;

  }
  addMoneyflag(){
       this.addmoneyFlag = true;
       this.withdrawflag =false;
  }

  withdrawFlag(){
      this.withdrawflag = true;
      this.addmoneyFlag = false;
  }
  addMoney(amount: number) {
    if (this.minValidator.invalid){
      this.wrongCredintial = true
      return;
    }
    this.wrongCredintial =false;
    this.balance += amount;
    this.addtowallet.push({ amount, date: new Date(), type: 'credit' });
    this.transactions.push({ amount, item:'Credit card', date:'',type: 'credit' });
    this.income += amount;
    this.saveData();
  }

  makePurchase(amount: number, item: string) {
    if (this.withdrawForm.invalid){
      console.log('Enter Valid Details');
      this.wrongPurchaseAmount = true;
      this.insufficientFlag = false;
      return;
    }
    else if(this.balance < amount){
      console.log('Insufficient Balance!');
      this.insufficientFlag = true;
      this.wrongPurchaseAmount = false;
      return;
    }
    else {
      this.balance -= amount;
      this.transactions.push({ amount, item, date: new Date().toLocaleString('en-us', { month:"short", day:"numeric" ,hour:"2-digit", minute:"2-digit"}), type: 'debit' });
      this.Expenses -= amount
      this.saveData();
      alert('Purchase successful!');
    }
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  private saveData() {
    localStorage.setItem('balance', this.balance.toString());
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }


  closeWallet(){
    this.walletFlag = false;
    console.log(this.walletFlag)
  }

  ngOnInit(){
    this.withdrawForm = this.formBuilder.group({
    purchaseItem : new FormControl('',[Validators.maxLength(25)]),
    purchaseAmount : new FormControl([Validators.min(1),Validators.required])
    })
    this.minValidator = this.formBuilder.group({
      amount : new FormControl([Validators.min(1),Validators.required])
    })
  }
}

