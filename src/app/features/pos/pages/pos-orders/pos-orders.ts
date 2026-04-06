import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PosOrder {
  id: string;
  customer: string;
  total: number;
  paymentMethod: 'cash' | 'card';
  date: string;
  itemsCount: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-pos-orders',
  templateUrl: './pos-orders.html',
  styleUrls: ['./pos-orders.scss']
})
export class PosOrdersComponent implements OnInit {
  orders: PosOrder[] = [
    { id: 'REC-5021', customer: 'عميل نقدي', total: 125, paymentMethod: 'cash', date: '2026-04-06 10:15', itemsCount: 3 },
    { id: 'REC-5022', customer: 'محمد سليم', total: 450, paymentMethod: 'card', date: '2026-04-06 10:30', itemsCount: 5 },
    { id: 'REC-5023', customer: 'عميل نقدي', total: 85, paymentMethod: 'cash', date: '2026-04-06 10:45', itemsCount: 1 },
    { id: 'REC-5024', customer: 'ريم العلي', total: 1120, paymentMethod: 'card', date: '2026-04-06 11:00', itemsCount: 12 },
  ];

  ngOnInit(): void {}
}
