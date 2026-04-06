import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  selector: 'app-pos-analytics',
  templateUrl: './pos-analytics.html',
  styleUrls: ['./pos-analytics.scss']
})
export class PosAnalyticsComponent implements OnInit {
  // Stats
  stats = [
    { label: 'مبيعات الكاشير اليوم', value: '$8,450.25', icon: '💰', color: '#10b981', bg: '#ecfdf5' },
    { label: 'عدد العمليات اليومية', value: '142 عملية', icon: '🧾', color: '#0062ff', bg: '#eff6ff' },
    { label: 'متوسط الفاتورة', value: '$59.50', icon: '📊', color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'أكثر الساعات نشاطاً', value: '4:00 PM', icon: '⏰', color: '#f59e0b', bg: '#fffbeb' },
  ];

  // Charts
  hourlySales: any = {};
  paymentMethods: any = {};

  ngOnInit(): void {
    const fontFamily = 'Cairo, sans-serif';

    this.hourlySales = {
      series: [{ name: 'المبيعات ($)', data: [450, 800, 1200, 1500, 2100, 1800, 2400, 3100, 2800, 1900, 1200, 600] }],
      chart: { type: 'area', height: 280, toolbar: { show: false }, fontFamily },
      colors: ['#0062ff'],
      stroke: { curve: 'smooth', width: 3 },
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
      xaxis: { categories: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'] },
      grid: { borderColor: '#f1f5f9', strokeDashArray: 4 }
    };

    this.paymentMethods = {
      series: [65, 35],
      chart: { type: 'donut', height: 280, fontFamily },
      labels: ['نقدي 💵', 'بطاقة 💳'],
      colors: ['#10b981', '#0062ff'],
      plotOptions: { pie: { donut: { size: '70%', labels: { show: true, total: { show: true, label: 'الإجمالي', formatter: () => '$8.4K' } } } } },
      legend: { position: 'bottom' }
    };
  }
}
