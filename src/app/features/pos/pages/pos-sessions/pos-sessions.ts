import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PosSession {
  id: string;
  cashier: string;
  openedAt: string;
  closedAt: string | null;
  openingBalance: number;
  closingBalance: number | null;
  totalSales: number;
  status: 'open' | 'closed';
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-pos-sessions',
  templateUrl: './pos-sessions.html',
  styleUrls: ['./pos-sessions.scss']
})
export class PosSessionsComponent implements OnInit {
  sessions: PosSession[] = [
    { id: 'SESS-001', cashier: 'أحمد علي', openedAt: '2026-04-06 08:00', closedAt: null, openingBalance: 500, closingBalance: null, totalSales: 2450.50, status: 'open' },
    { id: 'SESS-002', cashier: 'ريم محمد', openedAt: '2026-04-05 09:00', closedAt: '2026-04-05 17:00', openingBalance: 500, closingBalance: 3200, totalSales: 2700.00, status: 'closed' },
    { id: 'SESS-003', cashier: 'سارة خالد', openedAt: '2026-04-04 10:00', closedAt: '2026-04-04 18:00', openingBalance: 500, closingBalance: 2150, totalSales: 1650.00, status: 'closed' },
  ];

  ngOnInit(): void {}
}
