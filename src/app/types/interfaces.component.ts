export interface Transaction {
  amount: number;
  item: string;
  date: string;
  type: string;
}

export  interface AddToWallet{
  amount: number;
  date: Date;
  type: string;
}