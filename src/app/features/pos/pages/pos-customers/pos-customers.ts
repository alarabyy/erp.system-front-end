import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PosCustomer {
  id: string;
  name: string;
  phone: string;
  loyaltyPoints: number;
  totalSpent: number;
  lastVisit: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-pos-customers',
  templateUrl: './pos-customers.html',
  styleUrls: ['./pos-customers.scss']
})
export class PosCustomersComponent implements OnInit {
  customers: PosCustomer[] = [
    { id: 'CUS-001', name: 'أحمد محمود العلي', phone: '0501234567', loyaltyPoints: 450, totalSpent: 3500.50, lastVisit: '2026-04-05' },
    { id: 'CUS-002', name: 'سارة عبد الله', phone: '0507654321', loyaltyPoints: 120, totalSpent: 850.00, lastVisit: '2026-04-06' },
    { id: 'CUS-003', name: 'خالد إبراهيم', phone: '0559988776', loyaltyPoints: 890, totalSpent: 12400.75, lastVisit: '2026-04-01' },
    { id: 'CUS-004', name: 'ريم فيصل', phone: '0543322110', loyaltyPoints: 340, totalSpent: 2100.20, lastVisit: '2026-04-04' },
  ];

  ngOnInit(): void {}
}
