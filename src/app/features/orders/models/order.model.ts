export interface Order {
  orderNumber: string;
  customer: string;
  amount: number;
  status: 'open' | 'processing' | 'shipped' | 'delivered';
}
