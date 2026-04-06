import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  priorityLabel: string;
  status: 'pending' | 'ongoing' | 'completed';
  progress: number;
  line: string;
  workers: number;
}

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-list.html',
  styleUrls: ['./orders-list.scss'],
})
export class ProductionOrdersList implements OnInit {
  // Re-build trigger
  
  orders: ProductionOrder[] = [
    { id: 'ORD-5011', product: 'آيفون 15 بروميوم', quantity: 1500, dueDate: '2026-04-12', priority: 'high', priorityLabel: 'عالية', status: 'ongoing', progress: 65, line: 'Line A', workers: 12 },
    { id: 'ORD-5012', product: 'سامسونج S24 ألترا', quantity: 1200, dueDate: '2026-04-15', priority: 'medium', priorityLabel: 'متوسطة', status: 'pending', progress: 0, line: 'Line B', workers: 8 },
    { id: 'ORD-4099', product: 'سماعات سوني XM5', quantity: 3000, dueDate: '2026-04-05', priority: 'low', priorityLabel: 'عادية', status: 'completed', progress: 100, line: 'Line C', workers: 5 },
    { id: 'ORD-5015', product: 'ماك بوك برو M3', quantity: 450, dueDate: '2026-04-20', priority: 'high', priorityLabel: 'عالية', status: 'pending', progress: 0, line: 'Line A', workers: 15 },
    { id: 'ORD-5018', product: 'شاشة LG OLED 55', quantity: 800, dueDate: '2026-04-18', priority: 'medium', priorityLabel: 'متوسطة', status: 'ongoing', progress: 28, line: 'Line D', workers: 10 },
    { id: 'ORD-5022', product: 'لابتوب ديل إكس-بي-إس', quantity: 600, dueDate: '2026-04-25', priority: 'low', priorityLabel: 'عادية', status: 'pending', progress: 0, line: 'Line B', workers: 6 }
  ];

  constructor() {}

  ngOnInit(): void {}

  getByStatus(status: 'pending' | 'ongoing' | 'completed') {
    return this.orders.filter(o => o.status === status);
  }
}
