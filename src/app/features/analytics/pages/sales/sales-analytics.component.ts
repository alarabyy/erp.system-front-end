import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataMockService, SalesOrder } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-sales-analytics',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>📈 تحليل المبيعات</h1><p class="sub">أفضل المنتجات والعملاء وتحليل المناطق والاتجاهات</p></div>
        <button class="btn-luxe btn-ghost" routerLink="/analytics">← لوحة التحليلات</button>
      </header>
      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem" *ngFor="let k of kpis">
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600;margin-bottom:.4rem">{{ k.label }}</p>
          <h2 style="font-size:1.6rem;font-weight:800;margin-bottom:.25rem" [style.color]="k.color">{{ k.value }}</h2>
          <span style="font-size:.75rem;font-weight:700;color:#16a34a">{{ k.sub }}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📊 أفضل المنتجات مبيعاً</h3>
          <apx-chart *ngIf="topProducts.series" [series]="topProducts.series" [chart]="topProducts.chart" [xaxis]="topProducts.xaxis" [yaxis]="topProducts.yaxis" [plotOptions]="topProducts.plotOptions" [colors]="topProducts.colors" [dataLabels]="topProducts.dataLabels" [grid]="topProducts.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">🥧 العملاء الأكثر شراءً</h3>
          <apx-chart *ngIf="topCustomers.series" [series]="topCustomers.series" [chart]="topCustomers.chart" [labels]="topCustomers.labels" [colors]="topCustomers.colors" [plotOptions]="topCustomers.plotOptions" [legend]="topCustomers.legend" [responsive]="topCustomers.responsive"></apx-chart>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">🗺️ المبيعات بالمنطقة</h3>
          <apx-chart *ngIf="byRegion.series" [series]="byRegion.series" [chart]="byRegion.chart" [xaxis]="byRegion.xaxis" [yaxis]="byRegion.yaxis" [plotOptions]="byRegion.plotOptions" [colors]="byRegion.colors" [dataLabels]="byRegion.dataLabels" [grid]="byRegion.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📈 منحنى المبيعات الأسبوعي</h3>
          <apx-chart *ngIf="weeklyLine.series" [series]="weeklyLine.series" [chart]="weeklyLine.chart" [xaxis]="weeklyLine.xaxis" [yaxis]="weeklyLine.yaxis" [stroke]="weeklyLine.stroke" [fill]="weeklyLine.fill" [colors]="weeklyLine.colors" [dataLabels]="weeklyLine.dataLabels" [grid]="weeklyLine.grid"></apx-chart>
        </div>
      </div>
      <div class="data-table-wrap">
        <div class="table-header"><h3>أفضل الطلبات هذا الشهر</h3></div>
        <table class="erp-table">
          <thead><tr><th>رقم الطلب</th><th>العميل</th><th>المنطقة</th><th>القيمة</th><th>الحالة</th><th>الدفع</th></tr></thead>
          <tbody>
            <tr *ngFor="let o of orders$ | async">
              <td><strong>{{ o.orderNo }}</strong></td>
              <td>{{ o.customer }}</td>
              <td><span style="background:#eff6ff;color:#2563eb;padding:.3rem .7rem;border-radius:8px;font-size:.78rem;font-weight:700">{{ o.region }}</span></td>
              <td style="font-weight:800;color:var(--color-primary)">{{ o.total | currency:'USD':'symbol':'1.0-0' }}</td>
              <td><span class="status-chip" [class]="o.status">{{ {'pending':'قيد الانتظار','confirmed':'مؤكد','shipped':'مشحون','delivered':'مسلّم','cancelled':'ملغي'}[o.status] }}</span></td>
              <td><span class="status-chip" [class]="o.paymentStatus === 'paid' ? 'active' : o.paymentStatus === 'partial' ? 'pending' : 'cancelled'">{{ {'paid':'مدفوع','partial':'جزئي','unpaid':'غير مدفوع'}[o.paymentStatus] }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SalesAnalyticsComponent implements OnInit {
  orders$: Observable<SalesOrder[]>;
  topProducts: any = {}; topCustomers: any = {}; byRegion: any = {}; weeklyLine: any = {};
  kpis = [
    { label: 'إجمالي المبيعات', value: '$1.24M', color: '#0062ff', sub: '▲ 12.4% نمو' },
    { label: 'متوسط قيمة الطلب', value: '$3,924', color: '#7c3aed', sub: '▲ 5.1% تحسن' },
    { label: 'معدل التحويل', value: '68.4%', color: '#16a34a', sub: '▲ 3.2% تحسن' },
    { label: 'طلبات ملغاة', value: '3.2%', color: '#f43f5e', sub: '▼ 0.8% تحسن' },
  ];
  constructor(private data: DataMockService) { this.orders$ = this.data.getSalesOrders(); }
  ngOnInit() {
    const f = 'Cairo, sans-serif'; const g = '#f1f5f9';
    this.topProducts = {
      series: [{ name: 'المبيعات', data: [340, 280, 195, 168, 142, 98, 76] }],
      chart: { type: 'bar', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#0062ff'],
      plotOptions: { bar: { borderRadius: 6, horizontal: true, barHeight: '55%' } },
      dataLabels: { enabled: true, style: { fontFamily: f, fontSize: '10px' }, formatter: (v: number) => v + ' وحدة' },
      xaxis: { categories: ['آيفون 15 برو','ماك بوك M3','آيباد برو','AirPods ماكس','شاشة ستوديو','ساعة آبل','لوحة مفاتيح'], labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#475569' } } }, grid: { borderColor: g, strokeDashArray: 4 }
    };
    this.topCustomers = {
      series: [32, 24, 18, 15, 11], labels: ['تك نيكسوس','النخبة','مجموعة الأفق','الرقم الذكي','الحلول التقنية'],
      chart: { type: 'donut', height: 260, fontFamily: f, background: 'transparent' }, colors: ['#0062ff','#7c3aed','#10b981','#f59e0b','#f43f5e'],
      plotOptions: { pie: { donut: { size: '68%', labels: { show: true, total: { show: true, label: 'العملاء النشطون', fontFamily: f, formatter: () => '48' } } } } },
      legend: { position: 'bottom', fontFamily: f, fontSize: '10px', markers: { size: 7 } }, responsive: [{ breakpoint: 480, options: { chart: { height: 200 } } }]
    };
    this.byRegion = {
      series: [{ name: 'الإيرادات', data: [485000, 312000, 198000, 145000, 102000] }],
      chart: { type: 'bar', height: 240, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#7c3aed'],
      plotOptions: { bar: { borderRadius: 8, columnWidth: '55%' } }, dataLabels: { enabled: false },
      xaxis: { categories: ['الرياض','جدة','دبي','أبوظبي','الكويت'], labels: { style: { fontFamily: f, fontSize: '11px', colors: '#94a3b8' } } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v/1000).toFixed(0) + 'K' } }, grid: { borderColor: g, strokeDashArray: 4 }
    };
    this.weeklyLine = {
      series: [{ name: 'هذا الأسبوع', data: [12400, 18900, 15600, 21800, 19400, 24600, 22100] }, { name: 'الأسبوع الماضي', data: [10200, 15600, 12800, 18200, 16400, 21000, 18500] }],
      chart: { type: 'area', height: 240, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#0062ff','#e2e8f0'],
      stroke: { curve: 'smooth', width: [2, 2], dashArray: [0, 5] }, fill: { type: 'gradient', gradient: { opacityFrom: [0.3, 0], opacityTo: [0.02, 0] } }, dataLabels: { enabled: false },
      xaxis: { categories: ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'], labels: { style: { fontFamily: f, fontSize: '11px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v/1000).toFixed(0) + 'K' } }, grid: { borderColor: g, strokeDashArray: 4, xaxis: { lines: { show: false } } }
    };
  }
}
