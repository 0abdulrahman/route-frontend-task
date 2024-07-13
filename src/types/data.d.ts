export interface DataType {
  id: number;
  customer_id: number;
  date: string;
  amount: number;
}
[];

export interface TransactionType {
  id: number;
  customer_id: number;
  customer: string;
  date: Date;
  amount: number;
}

export interface CustomerType {
  id: number;
  name: string;
}
