import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Bom {
  id: string;
  code: string;
  name: string;
  componentCount: number;
  leadTime: number;
  costPerUnit: number;
  status: 'active' | 'draft' | 'archived';
  statusLabel: string;
}

interface ProductionLine {
  name: string;
  load: number;
  color: string;
}

interface MRPAlert {
  message: string;
  deficit: number;
}

@Component({
  selector: 'app-bom-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bom-list.html',
  styleUrls: ['./bom-list.scss'],
})
export class BomList implements OnInit {
  // Re-build trigger
  
  boms: Bom[] = [
    { id: '1', code: 'PROD-A', name: 'آيفون 15 بروميوم (تجميع)', componentCount: 42, leadTime: 3, costPerUnit: 840, status: 'active', statusLabel: 'نشط' },
    { id: '2', code: 'PROD-B', name: 'سامسونج S24 ألترا (تجميع)', componentCount: 38, leadTime: 4, costPerUnit: 720, status: 'active', statusLabel: 'نشط' },
    { id: '3', code: 'PROD-C', name: 'ماك بوك برو M3 (تجميع)', componentCount: 65, leadTime: 7, costPerUnit: 1450, status: 'draft', statusLabel: 'مسودة' },
    { id: '4', code: 'PROD-D', name: 'شاشة LG OLED (تصنيع)', componentCount: 15, leadTime: 2, costPerUnit: 468, status: 'active', statusLabel: 'نشط' },
    { id: '5', code: 'PROD-E', name: 'سماعات سوني (تجميع)', componentCount: 22, leadTime: 1, costPerUnit: 342, status: 'active', statusLabel: 'نشط' }
  ];

  productionLines: ProductionLine[] = [
    { name: 'خط التجميع النهائي A', load: 85, color: '#0062ff' },
    { name: 'خط الاختبارات الفنية B', load: 42, color: '#10b981' },
    { name: 'خط التغليف والتوزيع C', load: 92, color: '#f59e0b' },
    { name: 'خط التصنيع الأولي D', load: 60, color: '#a855f7' }
  ];

  alerts: MRPAlert[] = [
    { message: 'نقص في شاشات OLED - قسم التجميع', deficit: 120 },
    { message: 'نقص في بطاريات الليثيوم 5000mAh', deficit: 450 },
    { message: 'نقص في معالجات M3 المركزية', deficit: 15 }
  ];

  constructor() {}

  ngOnInit(): void {}
}
