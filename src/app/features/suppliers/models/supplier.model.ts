export interface Supplier {
  name: string;
  location: string;
  materialFocus: string;
  status: 'active' | 'paused' | 'review';
}
